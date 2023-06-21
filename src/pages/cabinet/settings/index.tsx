import { ReactElement } from 'react'

import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'
import CabinetLayout from '@/layouts/cabinet'

import CommonSettingsForm from '@/modules/settings/components/CommonSettingsForm'

import { NextPageWithLayout } from '@/pages/_app'

const ProfilePage: NextPageWithLayout = () => {
  return (
    <div className='settings-page'>
      <CommonSettingsForm />
    </div>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout pageTitle='Настройки'>
      <CabinetLayout>{page}</CabinetLayout>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  return { props: {} }
})

export default ProfilePage
