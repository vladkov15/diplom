import { ReactElement } from 'react'

import DefaultLayout from '@/layouts/default'
import CabinetLayout from '@/layouts/cabinet'

import { NextPageWithLayout } from '@/pages/_app'

import PromoCodeForm from '@/modules/promoCode/components/PromoCodeForm'

const PromoCodePage: NextPageWithLayout = () => {
  return (
    <div className='promo-code-page'>
      <PromoCodeForm />
    </div>
  )
}

PromoCodePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout pageTitle='Личный кабинет'>
      <CabinetLayout>{page}</CabinetLayout>
    </DefaultLayout>
  )
}

export default PromoCodePage
