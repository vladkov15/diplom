import React, { useCallback, useMemo } from 'react'

import ToastContainer from '@ui/components/toast/ToastContainer'
import { QueuedItem } from '@ui/components/toast/ToastProvider'
import Toast from '@ui/components/toast'

import {
  IMainToastNotification,
  useMainToastNotificationQueue,
} from '../MainToastNotificationProvider'

const MainToastNotificationList = () => {
  const { entries: notifications, remove } = useMainToastNotificationQueue()

  const handleCloseToast = useCallback(
    ({ id, data }: QueuedItem<IMainToastNotification>) => {
      remove(id)
      data.toastProps?.onClose?.()
    },
    [remove],
  )

  const notificationsWithFormattedProps = useMemo(() => {
    return notifications.map(({ id, data }) => ({
      id,
      data: {
        ...data,
        toastProps: {
          ...data.toastProps,
          onClose: () => handleCloseToast({ id, data }),
        },
      },
    }))
  }, [notifications])

  return (
    <ToastContainer position='top-end'>
      {notificationsWithFormattedProps.map(({ id, data }) => (
        <Toast key={id} {...data.toastProps}>
          {data.title && <Toast.Header {...data.toastHeaderProps}>{data.title}</Toast.Header>}
          <Toast.Body>{data.content}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}

export default MainToastNotificationList
