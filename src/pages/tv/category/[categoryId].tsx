import React, { FC } from 'react'

import {
  getChannelCategories,
  getChannelsByCategory,
  channelApi,
} from '@/modules/channel/channel.api'
import { selectCategoryById } from '@/modules/channel/channel.selector'

import { wrapper } from '@/app/store'
import { ApiHelper } from '@/app/api'
import { useAppSelector } from '@/app/hooks'

import DefaultLayout from '@/layouts/default'
import PageTitle from '@/components/PageTitle'
import ChannelGrid from '@/modules/channel/components/ChannelGrid'
import Breadcrumbs, { IBreadcrumb } from '@/components/Breadcrumbs'
import { IChannelCategory } from '@/modules/channel/channel.model'

const transformItem = (category?: IChannelCategory) => {
  return ({ key, label }: IBreadcrumb) => {
    if (key === '[categoryId]') return category?.name || ''
    return label
  }
}

interface TvCategoryProps {
  categoryId: number
}

const TvCategory: FC<TvCategoryProps> = ({ categoryId }) => {
  channelApi.endpoints.getChannelCategories.useQuerySubscription(undefined)

  const category = useAppSelector((state) => selectCategoryById(state, categoryId))

  if (!category) return null

  const breadcrumbs = <Breadcrumbs transformItem={transformItem(category)} omitKeys={['category']} />
  return (
    <DefaultLayout breadcrumbs={breadcrumbs}>
      {category && <PageTitle>{category.name}</PageTitle>}
      <ChannelGrid categoryId={categoryId} />
    </DefaultLayout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const categoryId = Number(ctx.query.categoryId)

  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  store.dispatch(getChannelCategories.initiate())
  store.dispatch(getChannelsByCategory.initiate({ category_ptr: categoryId }))

  await Promise.all(store.dispatch(channelApi.util.getRunningQueriesThunk()))

  return { props: { categoryId } }
})
export default TvCategory
