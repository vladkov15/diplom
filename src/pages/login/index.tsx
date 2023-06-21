import { GetServerSideProps, NextPage } from 'next'
import { getCsrfToken } from 'next-auth/react'

import EmptyLayout from '../../layouts/empty'

import LoginForm from '../../modules/auth/components/LoginForm'

import styles from './LoginPage.module.scss'

interface SignInProps {
  csrfToken: string
}

const LoginPage: NextPage<SignInProps> = ({ csrfToken }) => {
  return (
    <EmptyLayout title='Login Page'>
      <div className={styles.LoginPage}>
        <LoginForm csrfToken={csrfToken} />
      </div>
    </EmptyLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context) || null

  return { props: { csrfToken } }
}

export default LoginPage
