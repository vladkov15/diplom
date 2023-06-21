import React, { FC } from 'react'
import { IPacket } from '@/modules/packets/packet.model'

import { Button, Loader } from '@ui/index'
import AddPayCardForm from '@/modules/pay/components/AddPayCardForm'
import PayCard from '../../../pay/components/PayCard'

import styles from './PayPacketCard.module.scss'

import { useGetUserCardQuery } from '@/modules/pay/pay.api'
import { usePayPacketByCardMutation } from '@/modules/packets/packet.api'

interface PayPacketCardProps {
  packet: IPacket
}

const PayPacketCard: FC<PayPacketCardProps> = ({ packet }) => {
  const { data: card, isLoading: isCardLoading } = useGetUserCardQuery()
  const [
    payPacketByCard,
    { isLoading: isPayPacketByCardLoading, isSuccess: isPayPacketByCardSuccess },
  ] = usePayPacketByCardMutation()

  const handlePayByCard = () => {
    const data = new FormData()
    data.append('packet', `${packet.id}`)
    payPacketByCard({ data })
  }
  //
  // Добавил блокировку кнопки после успешной оплаты
  // После каждого запроса на оплату инвалидирую кэш в моих пакетах
  //

  return (
    <div className={styles.PayPacketCard}>
      {isCardLoading ? (
        <Loader />
      ) : card?.data ? (
        <>
          <PayCard.Info card={card?.data} />
          <Button
            loader={isPayPacketByCardLoading}
            disabled={isPayPacketByCardLoading || isPayPacketByCardSuccess}
            onClick={handlePayByCard}
          >
            Оплатить
          </Button>
        </>
      ) : (
        <AddPayCardForm
          title='Добавить карту'
          description='Введите данные карты. Гарантируем безопасность платежей.'
        />
      )}
    </div>
  )
}

export default PayPacketCard
