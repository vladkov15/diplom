import React, { FC } from 'react'

import styles from './SerialPage.module.scss'

import { wrapper } from '@/app/store'
import { ApiHelper } from '@/app/api'
import { ISerial } from '@/modules/serial/serial.model'
import { serialApi, useGetSerialQuery } from '@/modules/serial/serial.api'

import DefaultLayout from '@/layouts/default'
import SerialProvider from '@/modules/serial/SerialProvider'
import Breadcrumbs, { IBreadcrumb } from '@/components/Breadcrumbs'
import SerialDetailCard from '@/modules/serial/components/SerialDetailCard'

const transformItem = (serial?: ISerial) => {
  return ({ key, label }: IBreadcrumb) => {
    if (key === '[serialId]') return serial?.name || ''
    return label
  }
}

interface SerialPageProps {
  serialId: number
}

const SerialPage: FC<SerialPageProps> = ({ serialId }) => {
  const { data: serial } = useGetSerialQuery(serialId)

  if (!serial) return null

  return (
    <DefaultLayout
      pageTitle={serial?.name}
      breadcrumbs={<Breadcrumbs transformItem={transformItem(serial)} omitKeys={['genres']} />}
    >
      <div className={styles.SerialPage}>
        <div className={styles.SerialPage__MainContent}>
          <SerialProvider serial={serial}>
            <SerialDetailCard serial={serial} />
          </SerialProvider>
        </div>
        <div className={styles.SerialPage__Underside}></div>
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const serialId = Number(ctx.query.serialId)

  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  await store.dispatch(serialApi.endpoints.getSerial.initiate(serialId))

  await Promise.all(store.dispatch(serialApi.util.getRunningQueriesThunk()))

  return { props: { serialId } }
})

export default SerialPage
