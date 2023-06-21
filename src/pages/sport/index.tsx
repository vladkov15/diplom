import { NextPage } from 'next'

import DefaultLayout from '@/layouts/default'
import SportChannelSlider from '@/modules/sport/components/SportChannelSlider'

import { wrapper } from '@/app/store'
import { ApiHelper } from '@/app/api'
import { sportApi, useGetSportCategoriesQuery } from '@/modules/sport/sport.api'

import styles from './SportPage.module.scss'

const SportPage: NextPage = () => {
  const { data: categories } = useGetSportCategoriesQuery(undefined)

  return (
    <DefaultLayout pageTitle='Спорт'>
      <div className={styles.SportPage}>
        <div className={styles.SportPage__Description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </div>
        <div className={styles.SportPage__Body}>
          {categories?.map((category) => (
            <div className={styles.SportPage__ChannelSlider} key={category.id}>
              <SportChannelSlider category={category} limit={-1}  />
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
    await store.dispatch(sportApi.endpoints.getSportCategories.initiate())

    await Promise.all(store.dispatch(sportApi.util.getRunningQueriesThunk()))
  } catch (e) {
    console.error(e)
  }

  return { props: {} }
})

export default SportPage
