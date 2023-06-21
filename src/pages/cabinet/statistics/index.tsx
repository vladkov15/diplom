import { ReactElement } from 'react'

import styles from './Statistics.module.scss'

import DefaultLayout from '@/layouts/default'
import CabinetLayout from '@/layouts/cabinet'

import { NextPageWithLayout } from '@/pages/_app'

import { wrapper } from '@/app/store'
import { statisticsApi } from '@/modules/statistics/statistics.api'

import MyChannelProgressBar from '@/modules/statistics/components/MyChannelProgressBar'
import Divider from '@ui/components/Divider'
import Diagrams from '@/modules/statistics/components/diagrams'

const StatisticsPage: NextPageWithLayout = () => {
  return (
    <div className={styles.StatisticsPage}>
      <MyChannelProgressBar />
      <Divider />
      <Diagrams />
    </div>
  )
}

StatisticsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout pageTitle='Личный кабинет'>
      <CabinetLayout>{page}</CabinetLayout>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    await store.dispatch(statisticsApi.endpoints.getMyChannelStatus.initiate())

    await Promise.all(store.dispatch(statisticsApi.util.getRunningQueriesThunk()))
  } catch (e) {}

  return { props: {} }
})

export default StatisticsPage
