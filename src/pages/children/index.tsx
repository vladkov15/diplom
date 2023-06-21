import { NextPage } from 'next'

import DefaultLayout from '@/layouts/default'
import ChildrenChannelSlider from '@/modules/children/components/ChildrenChannelSlider'

import { wrapper } from '@/app/store'
import { ApiHelper } from '@/app/api'
import { childrenApi, useGetChildrenCategoriesQuery } from '@/modules/children/children.api'

import styles from './ChildrenPage.module.scss'

const ChildrenPage: NextPage = () => {
  const { data: categories } = useGetChildrenCategoriesQuery(undefined)

  return (
    <DefaultLayout pageTitle='Детям'>
      <div className={styles.ChildrenPage}>
        <div className={styles.ChildrenPage__Description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </div>
        <div className={styles.ChildrenPage__Body}>
          {categories?.map((category) => (
            <div className={styles.ChildrenPage__ChannelSlider} key={category.id}>
              <ChildrenChannelSlider category={category} limit={-1} />
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
    await store.dispatch(childrenApi.endpoints.getChildrenCategories.initiate())

    await Promise.all(store.dispatch(childrenApi.util.getRunningQueriesThunk()))
  } catch (e) {
    console.error(e)
  }

  return { props: {} }
})

export default ChildrenPage
