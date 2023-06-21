import React, { FC, useState } from 'react'
import Image from 'next/image'

import { useDeleteUserCardMutation, useGetUserCardQuery } from '../../pay.api'
import { IPayCard } from '../../pay.model'

import Button from '@ui/components/button'
import PayCardModal from '../AddPayCardModal'

import styles from './PayCard.module.scss'

interface PayCardInfoProps {
  card: IPayCard
}

const PayCardInfo: FC<PayCardInfoProps> = ({ card }) => {
  return (
    <div className={styles.PayCardInfo}>
      <div className={styles.PayCardInfo__ImageWrapper}>
        <Image src={card.image} alt={card.brand} width={70} height={70} />
      </div>
      <div className={styles.PayCardInfo__Brand}>{card.brand}</div>
      <div className={styles.PayCardInfo__Number}>{card.card}</div>
    </div>
  )
}

interface PayCardProps {
  title?: string
}

const PayCard: FC<PayCardProps> = React.memo(({ title }) => {
  const { data: card } = useGetUserCardQuery()
  const [deleteUserCard] = useDeleteUserCardMutation()

  const handleClickDeleteUserCard = () => deleteUserCard()

  const [openAddCardModal, setOpenAddCardModal] = useState(false)

  if (!card) return null

  return (
    <div className={styles.PayCard}>
      <div className={styles.PayCard__Header}>
        {title && <h2 className={styles.PayCard__Title}>{title}</h2>}
      </div>

      <div className={styles.PayCard__Body}>
        {card.data ? <PayCardInfo card={card.data} /> : <p className='mt-0'>{card.msg}</p>}
      </div>

      <div className={styles.PayCard__Footer}>
        {!card.data && <Button label='Добавить карту' onClick={() => setOpenAddCardModal(true)} />}
        {card.data && <Button label='Удалить' onClick={handleClickDeleteUserCard} />}
      </div>

      <PayCardModal open={openAddCardModal} onClose={() => setOpenAddCardModal(false)} />
    </div>
  )
})
PayCard.displayName = 'PayCard'

export default Object.assign(PayCard, { Info: PayCardInfo })
