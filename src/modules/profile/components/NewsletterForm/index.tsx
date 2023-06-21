import React, { FC, useEffect, useState } from 'react'

import Form from '@ui/components/form'
import Button from '@ui/components/button'
import { useMainToastNotificationQueue } from '@/modules/notification/MainToastNotificationProvider'

import {
  useGetProfileQuery,
  useSubscribeNewsletterMutation,
  useUnsubscribeNewsletterMutation,
} from '@/modules/profile/profile.api'
import { NewsletterNotificationKeys } from '@/modules/profile/profile.constants'

const { SUBSCRIBE_SUCCESS, UNSUBSCRIBE_SUCCESS } = NewsletterNotificationKeys

import styles from './NewsletterForm.module.scss'

const NewsletterForm: FC = React.memo(() => {
  const { data: profile } = useGetProfileQuery()

  const mainToast = useMainToastNotificationQueue()

  const [subscride, { data: subscrideResponse, isLoading: isSubscribeLoading }] =
    useSubscribeNewsletterMutation()
  const [unsubscride, { data: unsubscrideResponse, isLoading: isUnsubscribeLoading }] =
    useUnsubscribeNewsletterMutation()

  const [email, setEmail] = useState('')

  const handleClickSubscribe = () => subscride({ email })

  const handleClickUnsubscribe = () => unsubscride()

  useEffect(() => {
    if (!subscrideResponse) return

    const { msg } = subscrideResponse

    mainToast.removeAll()
    mainToast.add(SUBSCRIBE_SUCCESS, {
      title: <b>{msg || 'Внимание'}</b>,
      content: <b className='fw-medium'>Подписка оформлена</b>,
      toastProps: { autohide: true, variant: 'info' },
    })

    setEmail('')
  }, [subscrideResponse])

  useEffect(() => {
    if (!unsubscrideResponse) return

    const { msg } = unsubscrideResponse

    mainToast.removeAll()
    mainToast.add(UNSUBSCRIBE_SUCCESS, {
      title: <b>{msg || 'Внимание'}</b>,
      content: <b className='fw-medium'>Отписка оформлена</b>,
      toastProps: { autohide: true, variant: 'info' },
    })
  }, [unsubscrideResponse])

  if (!profile) return null

  return (
    <Form className={styles.NewsletterForm}>
      <div className={styles.NewsletterForm__Header}>
        <h3 className={styles.NewsletterForm__Title}>
          {!profile.mailing
            ? 'Подписаться на информационную рассылку:'
            : 'Подписка на информационную рассылку оформлена'}
        </h3>
      </div>

      <div className={styles.NewsletterForm__Body}>
        {!profile.mailing && (
          <Form.Group>
            <Form.FormControl
              label='Электронная почта'
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </Form.Group>
        )}
        <Form.Group>
          {!profile.mailing ? (
            <Button
              className={styles.NewsletterForm__SubscribeButton}
              label='Подписаться'
              loader={isSubscribeLoading}
              disabled={!email || isSubscribeLoading}
              onClick={handleClickSubscribe}
            />
          ) : (
            <Button
              className={styles.NewsletterForm__UnsubscribeButton}
              label='Отписаться'
              loader={isUnsubscribeLoading}
              disabled={isUnsubscribeLoading}
              onClick={handleClickUnsubscribe}
            />
          )}
        </Form.Group>
      </div>
    </Form>
  )
})
NewsletterForm.displayName = 'NewsletterForm'

export default NewsletterForm
