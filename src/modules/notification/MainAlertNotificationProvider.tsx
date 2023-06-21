import React, { FC } from 'react'

import { AlertProps } from '@ui'
import { createAlertContext } from '@ui/components/alert/AlertProvider'

export interface IMainAlertNotification {
  title?: React.ReactNode
  content: React.ReactNode
  alertProp: AlertProps
}

export const {
  AlertProvider,
  AlertQueueContext: MainAlertNotificationQueueContext,
  createAlertQueue: createMainAlertNotificationContext,
  useAlertQueue: useMainAlertNotificationQueue,
} = createAlertContext<IMainAlertNotification>()

interface MainAlertNotificationProviderProps {
  children: React.ReactNode
}

const MainAlertNotificationProvider: FC<MainAlertNotificationProviderProps> = ({ children }) => {
  return <AlertProvider>{children}</AlertProvider>
}

export default MainAlertNotificationProvider
