import React, { FC } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import Button from '@ui/components/button'
import OverlayTooltip from '@ui/components/overlay/OverlayTooltip'
import Logo from './Logo'
import MainNavigation from './MainNavigation'
import ProfileDropdown from '@/modules/profile/components/ProfileDropdown'
import SearchModal from '@/modules/search/components/SearchModal'

import styles from './MainHeader.module.scss'
import NotificationDropdown from '@/modules/notification/components/NotificationDropdown'

interface TriggerProps {
  onClick?: () => void
}

const SearchTrigger: FC<TriggerProps> = (props) => (
  <OverlayTooltip placement='bottom' content='Поиск'>
    <Button className={styles.SearchTrigger} variant='icon' icon>
      <i {...props} className='icon-search' />
    </Button>
  </OverlayTooltip>
)
SearchTrigger.displayName = 'SearchTrigger'

const NotificationTrigger = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <Button ref={ref} className={styles.NotificationTrigger} variant='icon' icon>
    <i {...props} className='icon-notifications-none' />
  </Button>
))
NotificationTrigger.displayName = 'NotificationTrigger'

const ProfileTrigger = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <Button ref={ref} className={styles.ProfileTrigger} variant='icon' icon>
    <i {...props} className='icon-person-outline' />
  </Button>
))
ProfileTrigger.displayName = 'ProfileTrigger'

const MainHeader: FC = () => {
  const { data: session } = useSession()

  return (
    <div className={styles.MainHeader}>
      <div className={`${styles.MainHeader__Content} container`}>
        <Logo />
        <MainNavigation />

        <div className={styles.MainHeader__Controls}>
          {/* {session && <SearchModal trigger={<SearchTrigger />} />}
          {session && <NotificationDropdown trigger={NotificationTrigger} />} */}
          <ProfileDropdown trigger={ProfileTrigger} />
        </div>
      </div>
    </div>
  )
}

MainHeader.displayName = 'MainHeader'

export default MainHeader
