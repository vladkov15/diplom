import React, { FC, useState } from 'react'
import { signIn } from 'next-auth/react'
import styled from 'styled-components'
import { useIMask } from 'react-imask'

import Form from '@ui/components/form'
import Button from '@ui/components/button'

import { useGetProfileQuery } from '@/modules/profile/profile.api'

import { changePassword } from '@/modules/profile/profile.actions'
import { useAppDispatch } from '@/app/hooks'

import styles from './ProfileForm.module.scss'

const PLACEHOLDER_CHAR = '*'
const DEFAULT_PASSWORD = PLACEHOLDER_CHAR.repeat(4)

const ProfileForm: FC = React.memo(() => {
  const { data: profile } = useGetProfileQuery()

  const dispatch = useAppDispatch()

  const [userPassword, setUserPassword] = useState(DEFAULT_PASSWORD)
  const [userPasswordCompleted, setUserPasswordCompleted] = useState(false)
  const [isEditableUserPassword, setIsEditableUserPassword] = useState(false)

  const { ref: loginRef } = useIMask({ mask: '+375 (00) 000-00-00', lazy: false })
  const { ref: passwordRef, ...passwordMask } = useIMask(
    { mask: '0000', lazy: isEditableUserPassword, eager: true, placeholderChar: PLACEHOLDER_CHAR },
    {
      onAccept: (value) => {
        setUserPasswordCompleted(false)
        setUserPassword(value)
      },
      onComplete: () => setUserPasswordCompleted(true),
    },
  )

  const handleClickEditUserPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    !isEditableUserPassword && setIsEditableUserPassword(true)

    setUserPassword('')
    passwordMask.setValue('')

    passwordRef.current?.focus()
  }

  const reEnterToSession = async (token: string) => {
    if (!profile) return

    try {
      await signIn('change_password', { token, redirect: false })
    } catch (e) {
    } finally {
      resetUserPassword()
    }
  }

  const handleClickSaveUserPassword = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const data = new FormData()

    if (profile) {
      data.append('login', profile.login)
      data.append('password', userPassword)

      const { token } = await dispatch(changePassword({ data })).unwrap()
      reEnterToSession(token)
    }
  }

  const handleBlurEditUserPassword = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (userPasswordCompleted) return

    resetUserPassword()
  }

  const resetUserPassword = () => {
    isEditableUserPassword && setIsEditableUserPassword(false)

    setUserPassword(DEFAULT_PASSWORD)
    passwordMask.setValue('')
  }

  if (!profile) return <>Loading...</>

  return (
    <Form className={styles.ProfileForm}>
      <Form.Group>
        <Form.FormControl ref={loginRef} label='Логин' defaultValue={profile.login} readOnly />
      </Form.Group>
      <Form.Group>
        <Form.FormControl
          ref={passwordRef}
          type='password'
          label='Пароль'
          defaultValue={DEFAULT_PASSWORD}
          appendInnerContent={
            !isEditableUserPassword ? (
              <EditButton key='editButton' type='button' onClick={handleClickEditUserPassword}>
                Изменить
              </EditButton>
            ) : (
              <EditButton
                key='saveButton'
                type='button'
                onClick={handleClickSaveUserPassword}
                disabled={!userPasswordCompleted}
              >
                Сохранить
              </EditButton>
            )
          }
          onBlur={handleBlurEditUserPassword}
          readOnly={!isEditableUserPassword}
        ></Form.FormControl>
      </Form.Group>
      <Form.Group>
        <Button className={styles.ProfileForm__LogoutButton} type='button' label='Выйти' />
      </Form.Group>
    </Form>
  )
})
ProfileForm.displayName = 'ProfileForm'

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  font-weight: 600;
  font-size: 12px;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'not-allowed')};
  color: ${({ disabled }) => (!disabled ? 'var(--accent)' : 'lightblue')};
  pointer-events: ${({ disabled }) => (!disabled ? 'all' : '')};
`

export default ProfileForm
