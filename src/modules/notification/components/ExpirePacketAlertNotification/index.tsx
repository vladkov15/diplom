import React, { useState } from 'react'

import { Alert, Button } from '@ui'

import {
  IExpirePacketNotificationAction,
  useCancelExpirePacketNotificationByIdMutation,
  useGetExpirePacketNotificationQuery,
} from '../../notification.api'

import styles from './ExpirePacketAlertNotification.module.scss'

const ExpirePacketAlertNotification = () => {
  const [show, setShow] = useState(true)
  const [params, setParams] = useState({ id: -1, step: 1 })

  const { data: notification, isLoading } = useGetExpirePacketNotificationQuery({ params })
  const [cancelExpirePacketNotificationById] = useCancelExpirePacketNotificationByIdMutation()

  const handleClickAction = (action: IExpirePacketNotificationAction) => {
    if (!notification) return

    switch (action.code) {
      case 'RENEW_SUBSCRIPTION': {
        setParams({ id: notification.id, step: 2 })
        break
      }
      case 'CANCEL': {
        cancelExpirePacketNotificationById(notification.id)
        setShow(false)
        break
      }
      case 'FINISH': {
        setShow(false)
        break
      }
      default:
        console.log('NO ACTION')
    }
  }

  if (!notification) return null

  return (
    <Alert show={show} className={styles.ExpirePacketAlertNotification} variant='info'>
      <Alert.Body dangerouslySetInnerHTML={{ __html: notification.content.content }} />
      <Alert.Footer className={styles.ExpirePacketAlertNotification__Footer}>
        {notification.content.actions.map((action) => (
          <Button
            className='fw-medium'
            variant={['CANCEL', 'FINISH'].includes(action.code) ? 'light' : 'warning'}
            size='sm'
            onClick={() => handleClickAction(action)}
            key={action.code}
            loader={action.code === 'RENEW_SUBSCRIPTION' && isLoading}
          >
            {action.name}
          </Button>
        ))}
      </Alert.Footer>
    </Alert>
  )
}

export default ExpirePacketAlertNotification
