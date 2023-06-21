import { ReactElement } from 'react'

import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'
import CabinetLayout from '@/layouts/cabinet'

import { NextPageWithLayout } from '@/pages/_app'

import { payApi } from '@/modules/pay/pay.api'

import PayCard from '@/modules/pay/components/PayCard'
import PayHistory from '@/modules/pay/components/PayHistory'
import Divider from '@ui/components/Divider'

import styles from './PayPage.module.scss'

const PayPage: NextPageWithLayout = () => {
  return (
    <div className={styles.PayPage}>
      <PayCard title='Банковские карты' />
{/* 
      <Divider />

      <PayHistory title='История оплат' /> */}
    </div>
  )
}

PayPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout pageTitle='Личный кабинет'>
      <CabinetLayout>{page}</CabinetLayout>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    await store.dispatch(payApi.endpoints.getUserCard.initiate())

    await Promise.all(store.dispatch(payApi.util.getRunningQueriesThunk()))
  } catch (e) {}

  return { props: {} }
})

export default PayPage
