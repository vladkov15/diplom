import React, { FC, useMemo } from 'react'
import classNames from 'classnames'

import { wrapper } from '@/app/store'
import { ApiHelper } from '@/app/api'
import {
  channelApi,
  useGetChannelByIdQuery,
  useGetChannelCategoriesQuery,
} from '@/modules/channel/channel.api'

import DefaultLayout from '@/layouts/default'
import Breadcrumbs, { IBreadcrumb } from '@/components/Breadcrumbs'
import ChannelSlider from '@/modules/channel/components/ChannelSlider'
import ParentControlProvider from '@/modules/parentControl/ParentControlProvider'
import ParentControl from '@/modules/parentControl/components/ParentControl'
import ChannelProvider from '@/modules/channel/ChannelProvider'

import { ChannelCategories, IChannel, IEpgAvailableDates } from '@/modules/channel/channel.model'

import styles from './TvChannelPage.module.scss'
import ChannelDetailCard from '@/modules/channel/components/ChannelDetailCard'
import NeedPackets from '@/modules/packets/components/NeedPackets'

const CHANNEL_CATEGORIES_LIMIT = 16

const CHANNEL_CATEGORIES = [
  ChannelCategories.BELARUS,
  ChannelCategories.INFORMATION,
  ChannelCategories.SPORT,
]

const transformItem = (channel?: IChannel) => {
  return ({ key, label }: IBreadcrumb) => {
    if (key === '[channelId]') return channel?.name || ''
    return label
  }
}

interface TVChannelPageProps {
  channelId: number
}

const TVChannelPage: FC<TVChannelPageProps> = ({ channelId }) => {
  const { data: channel } = useGetChannelByIdQuery(channelId)
  const { data: channelCategories } = useGetChannelCategoriesQuery()

  const categories = useMemo(() => {
    return channelCategories?.filter((category) => CHANNEL_CATEGORIES.includes(category.id))
  }, [channelCategories])

  if (!channel) return null

  return (
    <DefaultLayout
      pageTitle={channel?.name}
      breadcrumbs={<Breadcrumbs transformItem={transformItem(channel)} />}
    >
      <div className={styles.TvChannelPage}>
        <div className={styles.TvChannelPage__MainContent}>
          <ParentControlProvider available={channel.parent_control === 0}>
            <ParentControl className={classNames(styles.TvChannelPage__ParentControl)}>
              <NeedPackets packets={channel.need_packets}>
                <ChannelProvider channel={channel}>
                  <ChannelDetailCard />
                </ChannelProvider>
              </NeedPackets>
            </ParentControl>
          </ParentControlProvider>
        </div>
        <div className={styles.TvChannelPage__Underside}>
          {categories?.map((category) => (
            <div className={styles.TvChannelPage__ChannelContentSlider} key={category.id}>
              <ChannelSlider category={category} limit={CHANNEL_CATEGORIES_LIMIT} skeleton />
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const channel_ptr = Number(ctx.query.channelId)

  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  const { getChannelById, getEpgAvailableDates, getEpgCurrentProgram, getEpgDayProgram } =
    channelApi.endpoints

  const { data: channel } = await store.dispatch(getChannelById.initiate(channel_ptr))

  if (channel?.parent_control === 0 && !channel?.need_packets) {
    const payload = { channel_ptr, dates: 1 }
    const { data: epgEvailableDates } = await store.dispatch(getEpgAvailableDates.initiate(payload))

    const { current_start_time: start_time } = epgEvailableDates as IEpgAvailableDates
    await store.dispatch(getEpgDayProgram.initiate({ channel_ptr, start_time }))

    await store.dispatch(getEpgCurrentProgram.initiate({ channel_ptr }))
  }

  await Promise.all(store.dispatch(channelApi.util.getRunningQueriesThunk()))

  return { props: { channelId: channel_ptr, key: channel_ptr } }
})

export default TVChannelPage
