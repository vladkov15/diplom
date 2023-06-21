import React, { FC, useEffect } from 'react'
import { Alert, Button, Loader } from '@ui'

import { IPacket } from '@/modules/packets/packet.model'
import { useGetEripCodeQuery, useSendEripCodeToPhoneMutation } from '@/modules/packets/packet.api'
import { useMainToastNotificationQueue } from '@/modules/notification/MainToastNotificationProvider'

import { PacketNotificationKeys } from '../../packet.constants'

import styles from './PayPacketErip.module.scss'

const { SEND_ERIP_CODE_TO_PHONE_SUCCESS, SEND_ERIP_CODE_TO_PHONE_ERROR } = PacketNotificationKeys

interface PayPacketEripProps {
  packet: IPacket
}

const PayPacketErip: FC<PayPacketEripProps> = ({ packet }) => {
  const params = { packet_ptr: packet.id }
  const { data: eripCode, isLoading: isEripCodeLoading } = useGetEripCodeQuery({ params })
  const [
    sendEripCodeToPhone,
    {
      data: eripCodeToPhoneResponse,
      isLoading: isEripCodeToPhoneLoading,
      isSuccess: isEripCodeToPhoneSuccess,
      isError: isEripCodeToPhoneError,
    },
  ] = useSendEripCodeToPhoneMutation()

  const { add } = useMainToastNotificationQueue()

  const handleSendCodeToPhone = async () => {
    if (!eripCode) return
    const data = { erip: eripCode.erip }
    sendEripCodeToPhone({ data })
  }

  useEffect(() => {
    if (!eripCodeToPhoneResponse) return

    const { msg } = eripCodeToPhoneResponse

    add(SEND_ERIP_CODE_TO_PHONE_SUCCESS, {
      title: <b>Внимание</b>,
      content: <span className='fw-medium'>{msg || 'Сообщение отправлено успешно'}</span>,
      toastProps: { autohide: true, variant: 'info' },
    })
  }, [eripCodeToPhoneResponse])

  useEffect(() => {
    if (!isEripCodeToPhoneError) return

    add(SEND_ERIP_CODE_TO_PHONE_ERROR, {
      title: <b>Ошибка</b>,
      content: <span className='fw-medium'>Не удалось отправить сообщение</span>,
      toastProps: { autohide: true, variant: 'info' },
    })
  }, [isEripCodeToPhoneError])

  return (
    <div className={styles.PayPacketErip}>
      <div className={styles.PayPacketErip__EripNumber}>
        <div className={styles.PayPacketErip__EripNumber__EripLabel}>Код вашего заказа в ЕРИП</div>
        <Alert variant='white' className={styles.PayPacketErip__EripNumber__EripNumber}>
          {isEripCodeLoading && <Loader />}
          {eripCode && eripCode.erip}
        </Alert>
        <div className={styles.PayPacketErip__EripNumber__SendMessage}>
          <Button
            loader={isEripCodeToPhoneLoading}
            disabled={isEripCodeToPhoneLoading || isEripCodeToPhoneSuccess}
            onClick={handleSendCodeToPhone}
          >
            Отправить СМС на телефон
          </Button>
        </div>
      </div>
      <div className={styles.PayPacketErip__Instructions}>
        <div>
          <h4>Инструкция по оплате:</h4>
          <div className={styles.PaymentStep}>
            <p className={styles.PaymentStep__Title}>Через интернет-банкинг или терминал:</p>
            <p className={styles.PaymentStep__Description}>
              <span>Система «Расчет» ЕРИП</span>
              <i className='icon-arrow-line-forward' />
              <span>Интернет, телевидение, телефония</span>
              <i className='icon-arrow-line-forward' />
              <span>АйТиВи</span>
              <i className='icon-arrow-line-forward' />
              <span>itv.by</span>
            </p>
          </div>
          <div className={styles.PaymentStep}>
            <p className={styles.PaymentStep__Title}>Ввести номер заказа</p>
            <p className={styles.PaymentStep__Description}>После чего подтвердить оплату</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayPacketErip
