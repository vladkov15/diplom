import { FC, ReactNode } from 'react'
import Head from 'next/head'

import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'
import Breadcrumbs from '@/components/Breadcrumbs'
import MainAlertNotificationList from '@/modules/notification/components/MainAlertNotificationList'

export const SITE_TITLE = 'ITV WebCinema'

interface DefaultLayoutProps {
  pageTitle?: string
  title?: string
  withBreadcrumbs?: boolean
  breadcrumbs?: ReactNode
  children: ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({
  title,
  pageTitle,
  withBreadcrumbs = true,
  breadcrumbs,
  children,
}) => {
  return (
    <div className='default-layout'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1'
        />
        <meta name='og:title' content={SITE_TITLE} />
        <title>{title || SITE_TITLE}</title>
      </Head>
      <header className='default-layout__header'>
        <MainHeader />
      </header>
      <main className='default-layout__container container'>
        {withBreadcrumbs && (
          <div className='default-layout__breadcrumbs'>{breadcrumbs ?? <Breadcrumbs />}</div>
        )}
        <div className='default-layout__notifications'>
          <MainAlertNotificationList />
        </div>
        {pageTitle && <h3 className='page-title'>{pageTitle}</h3>}
        <div className='default-layout__content'>{children}</div>
      </main>
      <footer className='default-layout__footer'>
        <MainFooter />
      </footer>
    </div>
  )
}

export default DefaultLayout
