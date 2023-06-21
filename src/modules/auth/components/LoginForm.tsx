import React, { useState, FormEvent, FC, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useIMask } from 'react-imask'

import { ApiHelper } from '@/app/api'
import { AuthContext } from '../auth.context'

import Button from '@ui/components/button'
import Form from '@ui/components/form'

import styles from './LoginForm.module.scss'

interface SignInProps {
  csrfToken: string
}

const PHONE_CODE = '375'

const api = ApiHelper.getInstance()

const LoginForm: FC<SignInProps> = ({ csrfToken }) => {
  const { signIn } = useContext(AuthContext)

  const [login, setLogin] = useState('')
  const [loginCompleted, setLoginCompleted] = useState(false)

  const [password, setPassword] = useState('')
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false)
  const [resetPasswordError, setResetPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordCompleted, setPasswordCompleted] = useState(false)

  const [checkUserLoading, setCheckUserLoading] = useState(false)
  const [checkUser, setCheckUser] = useState(false)
  const [checkUserError, setCheckUserError] = useState('')

  const [loginUserLoading, setLoginUserLoading] = useState(false)
  const [loginUserError, setLoginUserError] = useState('')

  const [agree, setAgree] = useState(true)

  const { ref: loginRef } = useIMask(
    { mask: '+375 (00) 000-00-00', lazy: false },
    {
      onAccept: (_, { unmaskedValue }) => {
        setLoginCompleted(false)
        setCheckUser(false)
        setCheckUserError('')
        setLogin(PHONE_CODE + unmaskedValue)
      },
      onComplete: () => setLoginCompleted(true),
    },
  )

  const { ref: passwordRef } = useIMask(
    { mask: '0000' },
    {
      onAccept: (_, { unmaskedValue }) => {
        setPasswordCompleted(false)
        setPassword(unmaskedValue)
      },
      onComplete: (_) => setPasswordCompleted(true),
    },
  )

  const handleLoginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (loginUserLoading) return

    setLoginUserLoading(true)
    try {
      await signIn(login, password)
    } catch (e) {
      console.log(e)
    } finally {
      setLoginUserLoading(false)
    }
  }

  const handleCheckUser = async (login: string) => {
    setCheckUserLoading(true)
    try {
      const { data } = await api.services.auth.checkUser(login)
      if (!data.code) setCheckUserError(data.msg)
      else setCheckUser(true)
    } catch (e) {
    } finally {
      setCheckUserLoading(false)
    }
  }

  const handleRegisterUser = (login: string) => {
    setCheckUserError('')
  }

  const handleResetPasswordUser = async (login: string) => {
    setResetPasswordLoading(true)
    try {
      const { data } = await api.services.auth.resetPassword(login)
      if (!data.code) setResetPasswordError(data.msg)
    } catch (e) {
    } finally {
      setResetPasswordLoading(false)
    }
  }

  const handleRequestNewPassword = () => {
    if (!checkUser) handleRegisterUser(login)
    else handleResetPasswordUser(login)
  }

  const handleTogglePasswordVisible = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    setShowPassword((prev) => !prev)
  }

  useEffect(() => {
    if (!loginCompleted) {
      setPassword('')
      return
    }
    handleCheckUser(login)
  }, [loginCompleted])

  return (
    <Form className={styles.LoginForm} onSubmit={handleLoginUser}>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />

      <div className={styles.LoginForm__Header}>
        <h3 className={styles.LoginForm__Title}>Вход</h3>
        <p className={styles.LoginForm__Description}>
          Для авторизации введите свой номер телефона и пароль, который получили по SMS.
        </p>
      </div>

      <Form.Group className={styles.LoginForm__Group}>
        <Form.FormControl
          ref={loginRef}
          defaultValue={login}
          name='login'
          label='Телефон'
          className={styles.LoginForm__Input}
          readOnly={checkUserLoading}
          autoComplete='off'
        />
        {checkUserError && (
          <Form.Feedback className={styles.LoginForm__CheckUserErrorFeedback}>
            Пользователь с таким номером телефона отсутствует. Зарегистрируйте его,{' '}
            <a
              href='void:javascript(0)'
              className={styles.LoginForm__Link__RequestNewPassword}
              onClick={handleRequestNewPassword}
            >
              получив пароль по SMS
            </a>
            .
          </Form.Feedback>
        )}
      </Form.Group>

      {loginCompleted && (
        <>
          <Form.Group className={styles.LoginForm__Group}>
            <Form.FormControl
              ref={passwordRef}
              defaultValue={password || undefined}
              label='Пароль'
              name='password'
              type={!showPassword ? 'password' : 'text'}
              className={styles.LoginForm__Input}
              autoComplete='off'
              appendInnerContent={
                <button
                  type='button'
                  className={styles.LoginForm__TogglePassword}
                  onClick={handleTogglePasswordVisible}
                >
                  {showPassword ? (
                    <Image
                      src='/assets/img/icons/visibility.svg'
                      width={28}
                      height={28}
                      alt='Visibility'
                    />
                  ) : (
                    <Image
                      src='/assets/img/icons/visibility_off.svg'
                      width={28}
                      height={28}
                      alt='Visibility Off'
                    />
                  )}
                </button>
              }
            />
          </Form.Group>

          <Form.Group className={styles.LoginForm__Group__CheckBox}>
            <Form.Checkbox
              id='agree'
              checked={agree}
              onChange={() => setAgree((prev) => !prev)}
              label='Соглашаюсь с публичным договором'
            />
          </Form.Group>

          <div className={styles.LoginForm__Group__Submit}>
            <Button
              type='submit'
              label='Вход'
              loader={loginUserLoading}
              disabled={!checkUser || !passwordCompleted || !agree}
              full
            />
          </div>

          <div className={styles.LoginForm__Group__RequestNewPassword}>
            <Button
              variant='link'
              className={styles.LoginForm__Button__RequestNewPassword}
              label='Получить новый пароль по SMS'
              onClick={handleRequestNewPassword}
              disabled={!loginCompleted}
            />
          </div>
        </>
      )}
    </Form>
  )
}

export default LoginForm
