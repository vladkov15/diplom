import { FC, ReactNode } from 'react'
import Head from 'next/head'

import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'

export const SITE_TITLE = 'ITV WebCinema'

interface HomeLayoutProps {
  pageTitle?: string
  title?: string
  children: ReactNode
}

const HomeLayout: FC<HomeLayoutProps> = ({ title, children }) => {
  return (
    <div className='home-layout'>
      <Head>
        <meta name='og:title' content={SITE_TITLE} />
        <title>{title || SITE_TITLE}</title>
      </Head>
      <header className='home-layout__header is-fixed'>
        <MainHeader />
      </header>
      <main className='home-layout__container'>
        <div className='home-layout__content'>{children}</div>
      </main>
      <footer className='home-layout__footer'>
        <MainFooter />
      </footer>
    </div>
  )
}

export default HomeLayout
