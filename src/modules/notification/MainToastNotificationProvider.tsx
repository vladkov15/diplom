import React, { FC } from 'react'

import { createToastContext } from '@ui/components/toast/ToastProvider'
import { ToastProps } from '@ui/components/toast'
import { ToastHeaderProps } from '@ui/components/toast/ToastHeader'

import MainToastNotificationList from './components/MainToastNotificationList'

export interface IMainToastNotification {
  title?: React.ReactNode
  content: React.ReactNode
  toastProps?: ToastProps
  toastHeaderProps?: ToastHeaderProps
}

export const {
  ToastProvider,
  ToastQueueContext: MainToastNotificationQueueContext,
  createToastQueue: createMainToastNotificationContext,
  useToastQueue: useMainToastNotificationQueue,
} = createToastContext<IMainToastNotification>()

interface MainToastNotificationProviderProps {
  children: React.ReactNode
}

const MainToastNotificationProvider: FC<MainToastNotificationProviderProps> = ({ children }) => {
  return (
    <ToastProvider>
      <MainToastNotificationList />
      {children}
    </ToastProvider>
  )
}

export default MainToastNotificationProvider
