import React, { FC, useState } from 'react'
import Image from 'next/image'
import { useIMask } from 'react-imask'

import Form from '@ui/components/form'
import Button from '@ui/components/button'

import { useAddUserCardMutation } from '@/modules/pay/pay.api'

import styles from './AddPayCardForm.module.scss'

interface AddPayCardFormProps {
  title: string
  description: string
}

const AddPayCardForm: FC<AddPayCardFormProps> = React.memo(({ title, description }) => {
  const [addUserCard] = useAddUserCardMutation()

  const [cardNumber, setCardNumber] = useState('')
  const [cardNumberCompleted, setCardNumberCompleted] = useState(false)

  const [cardDate, setCardDate] = useState('')
  const [cardDateCompleted, setCardDateCompleted] = useState(false)

  const [cardName, setCardName] = useState('')

  const { ref: cardNumberRef } = useIMask(
    { mask: '0000 0000 0000 0000', lazy: false, placeholderChar: 'X' },
    {
      onAccept: (_, { unmaskedValue }) => {
        setCardNumberCompleted(false)
        setCardNumber(unmaskedValue)
      },
      onComplete: (_) => setCardNumberCompleted(true),
    },
  )

  const { ref: cardDateRef } = useIMask(
    { mask: '00/00', lazy: false, placeholderChar: 'X' },
    {
      onAccept: (_, { unmaskedValue }) => {
        setCardDateCompleted(false)
        setCardDate(unmaskedValue)
      },
      onComplete: (_) => setCardDateCompleted(true),
    },
  )

  const handleChangeCardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setCardName(value.toUpperCase())
  }

  const isConfirmButtonDisabled = !cardNumberCompleted || !cardDateCompleted || !cardName

  const addNewCardHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('card_number', cardNumber)
    formData.append('card_holder', cardName)
    formData.append('expire_month', cardDate.slice(0, 2))
    formData.append('expire_year', cardDate.slice(2, 4))

    addUserCard({ data: formData })
  }

  return (
    <Form className={styles.AddPayCardForm} onSubmit={addNewCardHandler}>
      <div className={styles.AddPayCardForm__Header}>
        {title && <h2 className={styles.AddPayCardForm__Title}>{title}</h2>}
        {description && <p className={styles.AddPayCardForm__Description}>{description}</p>}
      </div>
      <div className={styles.AddPayCardForm__Body}>
        <div className={styles.PayCard}>
          <div className={styles.PayCard__Header}>
            <div className={styles.PayCard__Partners}>
              <Image
                style={{ objectFit: 'contain' }}
                src='/assets/img/icons/mastercard_pay_card.png'
                width={40}
                height={30}
                alt='mastercard_pay_card'
              />
              <Image
                style={{ objectFit: 'contain' }}
                src='/assets/img/icons/visa_pay_card.png'
                width={70}
                height={30}
                alt='visa_pay_card'
              />
              <Image
                style={{ objectFit: 'contain' }}
                src='/assets/img/icons/belcard_pay_card.png'
                width={80}
                height={30}
                alt='belcard_pay_card'
              />
            </div>
          </div>
          <div className={styles.PayCard__Controls}>
            <Form.Group className={styles.PayCard__Controls__CardNumber}>
              <Form.FormControl ref={cardNumberRef} defaultValue={cardNumber} label='Номер карты' />
            </Form.Group>
            <Form.Group>
              <Form.FormControl label='Ваше имя' value={cardName} onChange={handleChangeCardName} />
            </Form.Group>
            <Form.Group>
              <Form.FormControl ref={cardDateRef} defaultValue={cardDate} label='Срок действия' />
            </Form.Group>
          </div>
        </div>
        <div className={styles.AddPayCardForm__ConfirmButton}>
          <Button label='Потвердить' disabled={isConfirmButtonDisabled} type='submit' />
        </div>
      </div>
      <div className={styles.AddPayCardForm__Footer}>
        Нажимая кнопку, ПОДТВЕРДИТЬ, Вы соглашаетесь с условиями{' '}
        <a href=''>пользовательского соглашения</a> и <a href=''>публичной оферты</a>.
      </div>
    </Form>
  )
})
AddPayCardForm.displayName = 'AddPayCardForm'

export default AddPayCardForm
