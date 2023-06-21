import { ReactElement } from 'react'

import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'
import CabinetLayout from '@/layouts/cabinet'

import ActivePacketList from '@/modules/packets/components/ActivePacketList'
import ProfileForm from '@/modules/profile/components/ProfileForm'
import Divider from '@ui/components/Divider'
import NewsletterForm from '@/modules/profile/components/NewsletterForm'

import { NextPageWithLayout } from '@/pages/_app'
import { packetApi, useGetPacketsQuery } from '@/modules/packets/packet.api'

const ProfilePage: NextPageWithLayout = () => {
  const { data: packets } = useGetPacketsQuery({ my: 1 })

  return (
    <div className='profile-page'>
      <ProfileForm />

      <Divider />

      {packets && <ActivePacketList packets={packets} />}

      <Divider />

      <NewsletterForm />
    </div>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout pageTitle='Личный кабинет'>
      <CabinetLayout>{page}</CabinetLayout>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    await store.dispatch(packetApi.endpoints.getPackets.initiate({ my: 1 }))

    await Promise.all(store.dispatch(packetApi.util.getRunningQueriesThunk()))
  } catch (e) {}

  return { props: {} }
})

export default ProfilePage
