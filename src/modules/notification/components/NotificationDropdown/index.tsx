import React, { FC, useState } from 'react'
import classNames from 'classnames'

import MainHeaderDropdown from '@/components/MainHeaderDropdown'

import styles from './NotificationDropdown.module.scss'

const NotificationEmpty = () => (
  <div className={styles.NotificationEmpty}>
    <i className='icon-notifications-on' />
    <span>Уведомлений нет</span>
  </div>
)

interface NotificationDropdown {
  trigger: React.ElementType
}

const NotificationDropdown: FC<NotificationDropdown> = ({ trigger }) => {
  const [notifications, setNotifications] = useState([])

  return (
    <div className={styles.MainHeaderDropdown}>
      <MainHeaderDropdown
        trigger={trigger}
        header='Уведомления'
        contentClassName={classNames({
          [styles.NotificationDropdown__Content]: true,
          [styles.Empty]: !notifications.length,
        })}
        align='end'
        hover
      >
        {!notifications.length && <NotificationEmpty />}
      </MainHeaderDropdown>
    </div>
  )
}
NotificationDropdown.displayName = 'NotificationDropdown'

export default NotificationDropdown
