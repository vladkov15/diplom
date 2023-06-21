import React from 'react'

import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'
import CabinetLayout from '@/layouts/cabinet'

import { NextPageWithLayout } from '@/pages/_app'

import PacketGrid from '@/modules/packets/components/PacketGrid'
import { packetApi, useGetPacketsQuery } from '@/modules/packets/packet.api'

const PacketsPage: NextPageWithLayout = () => {
  const { data: packets } = useGetPacketsQuery({ my: 0 })

  if (!packets) return null

  return (
    <div className='packets-page'>
      <PacketGrid packets={packets} />
    </div>
  )
}

PacketsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DefaultLayout pageTitle='Личный кабинет'>
      <CabinetLayout>{page}</CabinetLayout>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    await store.dispatch(packetApi.endpoints.getPackets.initiate({ my: 0 }))

    await Promise.all(store.dispatch(packetApi.util.getRunningQueriesThunk()))
  } catch (e) {}

  return { props: {} }
})

export default PacketsPage
