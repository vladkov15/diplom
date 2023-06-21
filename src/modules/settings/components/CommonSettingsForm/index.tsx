import React, { FC, useEffect, useState } from 'react'

import { Loader } from '@ui'
import Form from '@ui/components/form'
import { useMainToastNotificationQueue } from '@/modules/notification/MainToastNotificationProvider'

import { useGetUserSettingsQuery, useUpdateUserSettingsMutation } from '@/modules/user/user.api'
import { SettingsNotificationKeys } from '../settings.constants'

import styles from './CommonSettingsForm.module.scss'
import { log } from 'console'

const { UPDATE_SETTINGS_SUCCESS, UPDATE_SETTINGS_ERROR } = SettingsNotificationKeys

interface ICommonForm {
  parent_control: number
  notifications: number
}

const CommonSettingsForm: FC = React.memo(() => {
  const { data: userSettings } = useGetUserSettingsQuery()
  const [updateUserSettings] = useUpdateUserSettingsMutation()

  const { add } = useMainToastNotificationQueue()

  const [form, setForm] = useState<ICommonForm | null>(() => {
    if (!userSettings) return null
    return {
      parent_control: userSettings.parent_control,
      notifications: userSettings.notifications,
    }
  })

  useEffect(() => {
    if (form || !userSettings) return

    setForm((prev) => ({
      ...prev,
      parent_control: userSettings.parent_control,
      notifications: userSettings.notifications,
    }))
  }, [userSettings])

  const handleChangeCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cacheForm = Object.assign({}, form)

    try {
      const data = { [e.target.name]: Number(e.target.checked) }
      setForm((prev) => prev && { ...prev, ...data })
      const { msg } = await updateUserSettings({ data }).unwrap()

      add(UPDATE_SETTINGS_SUCCESS, {
        title: <b>Внимание</b>,
        content: <span className='fw-medium'>{msg}</span>,
        toastProps: { variant: 'info', autohide: true },
      })
    } catch (error: any) {
      setForm(cacheForm)
      let content = 'Данные не обновлены'
      if (error.code === 400) content = error.message.msg

      add(UPDATE_SETTINGS_ERROR, {
        title: <b>Ошибка</b>,
        content: <span className='fw-medium'>{content}</span>,
        toastProps: { variant: 'danger', autohide: true },
      })
    }
  }

  if (!form) return <Loader />

  return (
    <Form className={styles.CommonSettingsForm}>
      <div className={styles.CommonSettingsForm__Header}>
        <h3 className={styles.CommonSettingsForm__Title}>Общие настройки</h3>
      </div>

      <Form.Group>
        <Form.Checkbox
          type='switch'
          name='parent_control'
          label='Включить родительский контроль'
          checked={form.parent_control === 1}
          onChange={handleChangeCheckbox}
        />
      </Form.Group>

      <Form.Group>
        <Form.Checkbox
          type='switch'
          name='notifications'
          label='Включить оповещения о начале ТВ-передачи'
          checked={form.notifications === 1}
          onChange={handleChangeCheckbox}
        />
      </Form.Group>
    </Form>
  )
})
CommonSettingsForm.displayName = 'CommonSettingsForm'

export default CommonSettingsForm
