import { NextPage } from 'next'
import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'
import FAQTabs from '@/modules/support/components/FAQTabs'

import styles from './SupportPage.module.scss'

const SupportPage: NextPage = () => {
  return (
    <DefaultLayout pageTitle='Техподдержка' title='Support'>
      <div className={styles.SupportPage}>
        <FAQTabs />
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((/*store*/) => async () => {
  try {
  } catch (e) {}

  return { props: {} }
})

export default SupportPage
