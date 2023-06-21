import Head from 'next/head'
import { FC } from 'react'

export const SITE_TITLE = 'Стриминг Сервис'

interface EmptyLayoutProps {
  title?: string
  children: React.ReactNode
}

const EmptyLayout: FC<EmptyLayoutProps> = ({ title, children }) => {
  return (
    <div className='empty-layout'>
      <Head>
        <meta name='og:title' content={SITE_TITLE} />
        <title>{title || SITE_TITLE}</title>
      </Head>
      <main className='empty-layout__content'>{children}</main>
    </div>
  )
}

export default EmptyLayout
