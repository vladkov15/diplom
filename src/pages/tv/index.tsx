import { NextPage } from 'next'
import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'
import ChannelSlider from '@/modules/channel/components/ChannelSlider'

import { ApiHelper } from '@/app/api'
import { useGetChannelCategoriesQuery, channelApi } from '@/modules/channel/channel.api'
import { getChannelCategoriesForSSR } from '@/modules/channel/channel.service'

import styles from './TvPage.module.scss'
import FavoritesChannelSlider from '@/modules/favorite/components/FavoritesChannelSlider'
import { ChannelCategories } from '@/modules/channel/channel.model'

const CHANNEL_CATEGORIES_LIMIT = 16
const CHANNEL_CATEGORIES = [
  ChannelCategories.BELARUS,
  ChannelCategories.INFORMATION,
  ChannelCategories.SPORT,
  ChannelCategories.CHILDREN,
]

const TvPage: NextPage = () => {
  const { data: categories } = useGetChannelCategoriesQuery()

  const arr = categories?.filter((item) => item.id)

  const categoriesForSSR = getChannelCategoriesForSSR(arr || []).map(({ id }) => id)

  return (
    <DefaultLayout pageTitle='Тв-каналы'>
      <div className={styles.TvPage}>
        <div className={styles.TvPage__Description}>
          {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum. */}
        </div>
        <div className={styles.TvPage__Body}>
          <div className={styles.TvPage__FavoritesChannelSlider}>
            <FavoritesChannelSlider />
          </div>

          {CHANNEL_CATEGORIES?.map((category, index) => (
            <div className={styles.TvPage__ChannelSlider}>
              <ChannelSlider category={categories![index]} limit={CHANNEL_CATEGORIES_LIMIT} />
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  try {
    await store.dispatch(channelApi.endpoints.getChannelCategories.initiate())
    const { data: categories } = channelApi.endpoints.getChannelCategories.select()(
      store.getState(),
    )

    const categoriesForSSR = getChannelCategoriesForSSR(categories || [])

    categoriesForSSR.forEach((category) =>
      store.dispatch(
        channelApi.endpoints.getChannelsByCategory.initiate({
          category_ptr: category.id,
          limit: CHANNEL_CATEGORIES_LIMIT,
        }),
      ),
    )

    await Promise.all(store.dispatch(channelApi.util.getRunningQueriesThunk()))
  } catch (e) {
    console.error(e)
  }

  return { props: {} }
})

export default TvPage
