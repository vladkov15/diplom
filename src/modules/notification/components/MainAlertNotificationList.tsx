import React, { useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'

import AlertContainer from '@ui/components/alert/AlertContainer'
import { QueuedItem } from '@ui/components/alert/AlertProvider'
import Alert from '@ui/components/alert'

import {
  IMainAlertNotification,
  useMainAlertNotificationQueue,
} from '../MainAlertNotificationProvider'
import ExpirePacketAlertNotification from './ExpirePacketAlertNotification'

const MainAlertNotificationList = () => {
  const session = useSession()
  const { entries: notifications, remove } = useMainAlertNotificationQueue()

  const handleCloseAlert = useCallback(
    ({ id, data }: QueuedItem<IMainAlertNotification>) => {
      remove(id)
      data.alertProp.onClose?.()
    },
    [remove],
  )

  const notificationsWithFormattedProps = useMemo(() => {
    return notifications.map(({ id, data }) => ({
      id,
      data: {
        ...data,
        alertProp: {
          ...data.alertProp,
          onClose: () => handleCloseAlert({ id, data }),
        },
      },
    }))
  }, [notifications])

  return (
    <AlertContainer>
      {session.status === 'authenticated' && <ExpirePacketAlertNotification />}
      {notificationsWithFormattedProps.map(({ id, data }) => (
        <Alert {...data.alertProp} key={id}>
          {data.title && <Alert.Header>{data.title}</Alert.Header>}
          <Alert.Body>{data.content}</Alert.Body>
        </Alert>
      ))}
    </AlertContainer>
  )
}

export default MainAlertNotificationList
