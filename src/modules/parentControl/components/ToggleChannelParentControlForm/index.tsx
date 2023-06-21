import React, { FC, useContext, useEffect } from 'react'

import {
  useOffChannelParentControlMutation,
  useOnChannelParentControlMutation,
} from '@/modules/channel/channel.api'
import { ChannelContext } from '@/modules/channel/channel.context'

import { ParentControlFormProps } from '../ParentControlForm'
import ValidateParentControlForm from '../ValidateParentControlForm'

import styles from './ToggleChannelParentControlForm.module.scss'

export interface ToggleChannelParentControlFormProps
  extends Omit<ParentControlFormProps, 'title' | 'description'> {
  onToggleSuccess?: () => void
}

const ToggleChannelParentControlForm: FC<ToggleChannelParentControlFormProps> = React.memo(
  ({ onToggleSuccess, ...props }) => {
    const { channel } = useContext(ChannelContext)

    const [onChannelParentControl, { isLoading: onChannelLoading, isSuccess: onChannelSuccess }] =
      useOnChannelParentControlMutation()

    const [
      offChannelParentControl,
      { isLoading: offChannelLoading, isSuccess: offChannelSuccess },
    ] = useOffChannelParentControlMutation()

    const handleValidateSuccess = () => {
      if (channel.parent_control) offChannelParentControl({ channel_ptr: channel.id })
      else onChannelParentControl({ data: { channel_ptr: channel.id } })
    }

    useEffect(() => {
      if (onChannelSuccess) onToggleSuccess?.()
    }, [onChannelSuccess])

    useEffect(() => {
      if (offChannelSuccess) onToggleSuccess?.()
    }, [offChannelSuccess])

    return (
      <div className={styles.ToggleChannelParentControlForm}>
        <ValidateParentControlForm
          {...props}
          description={`Чтобы ${
            channel.parent_control ? 'ОТКЛЮЧИТЬ' : 'ВКЛЮЧИТЬ'
          } функцию родительского контроля, введите код, который был ранее отправлен Вам на телефон.`}
          busy={onChannelLoading || offChannelLoading}
          onValidateSuccess={handleValidateSuccess}
        />
      </div>
    )
  },
)
ToggleChannelParentControlForm.displayName = 'ToggleChannelParentControlForm'

export default ToggleChannelParentControlForm
