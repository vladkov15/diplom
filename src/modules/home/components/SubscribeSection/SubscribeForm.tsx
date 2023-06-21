import React, { FC, useState } from 'react'
import { useIMask } from 'react-imask'
import cn from 'classnames'

import Button from '@ui/components/button'
import Form from '@ui/components/form'

import styles from './SubscribeForm.module.scss'

const PHONE_CODE = '375'

const SubscribeForm: FC = React.memo(() => {
  const { ref: subscribeRef } = useIMask(
    { mask: '+375 (00) 000-00-00', lazy: false },
    {
      onAccept: (_, { unmaskedValue }) => {
        setPhoneCompleted(false)
        setPhone(PHONE_CODE + unmaskedValue)
      },
      onComplete: () => setPhoneCompleted(true),
    },
  )

  const [phone, setPhone] = useState('')
  const [phoneCompleted, setPhoneCompleted] = useState(false)

  return (
    <Form className={styles.SubscribeForm}>
      <p className={styles.SubscribeForm__Title}>Введите номера телефона</p>

      <Form.Group className={styles.SubscribeForm__Group}>
        <Form.FormControl ref={subscribeRef} />
      </Form.Group>

      <div className={cn(styles.SubscribeForm__Group, styles.SubscribeForm__GroupSubmit)}>
        <Button label='Получить код ЕРИП' disabled={!phoneCompleted} />
      </div>
    </Form>
  )
})
SubscribeForm.displayName = 'SubscribeForm'

export default SubscribeForm
