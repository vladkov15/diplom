import React, { FC, useState } from 'react'
import { useIMask } from 'react-imask'
import cn from 'classnames'

import Button from '@ui/components/button'
import Form from '@ui/components/form'

import { useActivatePromoCodeMutation } from '../../promoCode.api'

import styles from './PromoCodeForm.module.scss'

const PromoCodeForm: FC = React.memo(() => {
  const [activatePromoCode, { isLoading: isActivatePromoCodeLoading }] =
    useActivatePromoCodeMutation()

  const { ref: accessCodeRef } = useIMask(
    { mask: '00000 00000', lazy: false, placeholderChar: 'X' },
    {
      onAccept: (_, { unmaskedValue }) => {
        setAccessCodeCompleted(false)
        setAccessCode(unmaskedValue)
      },
      onComplete: () => setAccessCodeCompleted(true),
    },
  )

  const { ref: pinCodeRef } = useIMask(
    { mask: '0000', lazy: false, placeholderChar: 'X' },
    {
      onAccept: (_, { unmaskedValue }) => {
        setPinCodeCompleted(false)
        setPinCode(unmaskedValue)
      },
      onComplete: () => setPinCodeCompleted(true),
    },
  )

  const [accessCode, setAccessCode] = useState('')
  const [accessCodeCompleted, setAccessCodeCompleted] = useState(false)

  const [pinCode, setPinCode] = useState('')
  const [pinCodeCompleted, setPinCodeCompleted] = useState(false)

  const handleClickActivatePromoCode = () => {
    activatePromoCode({ card_number: accessCode, card_pin: pinCode })
  }

  const isSubmitDisabled = !accessCodeCompleted || !pinCodeCompleted || isActivatePromoCodeLoading

  return (
    <Form className={styles.PromoCodeForm}>
      <h2 className={styles.PromoCodeForm__Title}>Для активации кода введите</h2>

      <Form.Group className={styles.PromoCodeForm__Group}>
        <Form.FormControl ref={accessCodeRef} defaultValue={accessCode} label='Код доступа' />
      </Form.Group>

      <Form.Group className={styles.PromoCodeForm__Group}>
        <Form.FormControl ref={pinCodeRef} defaultValue={pinCode} label='Пин-код' />
      </Form.Group>

      <Form.Group className={cn(styles.PromoCodeForm__Group, styles.PromoCodeForm__GroupSubmit)}>
        <Button
          label='Активировать'
          onClick={handleClickActivatePromoCode}
          loader={isActivatePromoCodeLoading}
          disabled={isSubmitDisabled}
        />
      </Form.Group>
    </Form>
  )
})
PromoCodeForm.displayName = 'PromoCodeForm'

export default PromoCodeForm
