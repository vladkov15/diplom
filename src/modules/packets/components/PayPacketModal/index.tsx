import React, { cloneElement, FC, useState } from 'react'

import { Modal, Alert } from '@ui/index'
import PageTitle from '@/components/PageTitle'

import { IPacket } from '@/modules/packets/packet.model'

import styles from './PayPacketModal.module.scss'

interface PayOrderInfoProps {
  packet: IPacket
}

const PayOrderInfo: FC<PayOrderInfoProps> = ({ packet }) => {
  return (
    <Alert variant='accent' className={styles.PayOrderInfo}>
      <div className={styles.PayOrderInfo__PacketTitle}>
        <span>{packet.name}</span>
      </div>
      <div className={styles.PayOrderInfo__PacketLength}>
        <span>Длительность пакета {packet.days} дней</span>
      </div>
      <div className={styles.PayOrderInfo__PacketPrice}>
        <span>Стоимость {packet.price.replace('.00', '')} рублей</span>
      </div>
    </Alert>
  )
}

interface PayPacketModalProps {
  packet: IPacket
  trigger?: React.ReactElement
  open?: boolean
  onClose?: () => void
  pageTitle: string
  children?: React.ReactNode
}

const PayPacketModal: FC<PayPacketModalProps> = ({
  packet,
  trigger,
  open,
  onClose,
  pageTitle,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(open)

  const handleOpen = () => {
    setInternalOpen(true)
  }

  const handleClose = () => {
    setInternalOpen(false)
    onClose?.()
  }

  return (
    <div className={styles.PayPacketModal}>
      {trigger
        ? cloneElement(trigger, { ...trigger.props, onClick: handleOpen }, trigger.props.children)
        : null}
      <Modal
        show={internalOpen}
        onHide={handleClose}
        className={styles.SearchModal}
        contentClassName='bg-transparent'
        backdrop='static'
        keyboard={false}
        centered
        closeButton
        fullscreen
      >
        <Modal.Header className={styles.PayPacketModal__Header}>
          <PageTitle>{pageTitle}</PageTitle>
        </Modal.Header>
        {/* TODO: блокировка кнопок оплатить картой и отправить на телефон, после успешного ответа сервера, инвалидация запроса packets/my после успешной оплаты картой*/}
        <Modal.Body className={styles.PayPacketModal__Body}>
          <div className={styles.PayPacketModal__PayOrderInfo}>
            <PayOrderInfo packet={packet} />
          </div>
          <div className={styles.PayPacketModal__Content}>{children}</div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default PayPacketModal
