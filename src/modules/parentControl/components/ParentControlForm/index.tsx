import React, { FC, useEffect, useState } from 'react'
import { useIMask } from 'react-imask'
import classNames from 'classnames'

import { Button } from '@ui'
import Form from '@ui/components/form'

import { useResetParentControlPasswordMutation } from '../../parentControl.api'

import styles from './ParentControlForm.module.scss'

export interface IParentControlForm {
  password: string
}

export interface ParentControlFormProps {
  title?: string
  description?: string
  busy?: boolean
  onSubmit?: ({ password }: IParentControlForm) => void
  onChange?: ({ password }: IParentControlForm) => void
}

const ParentControlForm: FC<ParentControlFormProps> = React.memo(
  ({ title, description, busy, onSubmit, onChange }) => {
    const [resetPassword, { isLoading: resetLoading }] = useResetParentControlPasswordMutation()

    const { ref: passwordRef, value: password } = useIMask(
      { mask: '0000', lazy: false, placeholderChar: 'X' },
      {
        onAccept: () => setPasswordCompleted(false),
        onComplete: () => setPasswordCompleted(true),
      },
    )

    const [passwordCompleted, setPasswordCompleted] = useState(false)

    const handleSubmit = () => onSubmit?.({ password })
    const handleClickResetPassword = () => resetPassword()

    useEffect(() => {
      onChange?.({ password })
    }, [password])

    return (
      <Form className={styles.ParentControlForm} onSubmit={handleSubmit}>
        {title && <h2 className={styles.ParentControlForm__Title}>{title}</h2>}
        {description && <p className={styles.ParentControlForm__Description}>{description}</p>}

        <Form.Group className={styles.ParentControlForm__Group}>
          <Form.FormControl ref={passwordRef} defaultValue={password} label='Пароль' />
        </Form.Group>

        <Form.Group
          className={classNames(
            styles.ParentControlForm__Group,
            styles.ParentControlForm__GroupSubmit,
          )}
        >
          <Button
            type='submit'
            label='Подтвердить'
            loader={busy}
            disabled={!passwordCompleted || busy}
          />
        </Form.Group>

        <Form.Group
          className={classNames(
            styles.ParentControlForm__Group,
            styles.ParentControlForm__GroupResetPassword,
          )}
        >
          <Form.Label>Забыли пароль?</Form.Label>
          <Button
            className={styles.ResetPasswordButton}
            variant='link'
            label='Получить новый по SMS'
            onClick={handleClickResetPassword}
            loader={resetLoading}
            loaderProps={{ size: 'sm' }}
          />
        </Form.Group>
      </Form>
    )
  },
)
ParentControlForm.displayName = 'ParentControlForm'

export default ParentControlForm
