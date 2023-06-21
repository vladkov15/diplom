import { FC, ReactNode } from 'react'

import CabinetNavigation from '@/components/CabinetNavigation'

export const SITE_TITLE = 'ITV WebCinema'

interface CabinetLayoutProps {
  pageTitle?: string
  title?: string
  children: ReactNode
}

const CabinetLayout: FC<CabinetLayoutProps> = ({ children }) => {
  return (
    <div className='cabinet-layout'>
      <aside className='cabinet-layout__sidebar'>
        <CabinetNavigation />
      </aside>
      <div className='cabinet-layout__content'>{children}</div>
    </div>
  )
}

export default CabinetLayout
