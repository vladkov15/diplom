import React, { FC, useMemo } from 'react'

import Button from '@ui/components/button'
import Form from '@ui/components/form'
import PayPacketErip from '@/modules/packets/components/PayPacketErip'
import PayPacketModal from '@/modules/packets/components/PayPacketModal'
import PayPacketCard from '@/modules/packets/components/PayPacketCard'

import { useSetAutoPaidForPacketsMutation } from '@/modules/packets/packet.api'
import { IPacket } from '../../packet.model'

import styles from './ActivePacketCard.module.scss'
import classNames from 'classnames'

interface PacketCardProps {
  packet: IPacket
}

const ActivePacketCard: FC<PacketCardProps> = React.memo(({ packet }) => {
  const [setAutoPaid, { isLoading }] = useSetAutoPaidForPacketsMutation()

  const handleChangeAutoPaid = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoPaid({ data: { packet_id: packet.id, status: e.currentTarget.checked } })
  }
  const packetFeaturesLabels = useMemo(() => {
    return packet.features?.filter((feature) => feature.value).map((feature) => feature.label)
  }, [packet])

  return (
    <div className={styles.ActivePacketCard}>
      <div className={styles.ActivePacketCard__ImageContainer}>
        <img className={styles.ActivePacketCard__Image} src={'/assets/img/radial-gradient-top-left.png'} alt={packet.name} />
        {/* <h2 className={styles.ActivePacketCard__Title}>{packet.name}</h2> */}
        <h2 className={styles.ActivePacketCard__Title}>{'Casual'}</h2>
      </div>
      <div className={styles.ActivePacketCard__InnerContainer}>
        <div className={styles.ActivePacketCard__Body}>
          <ul className={styles.ActivePacketCard__MetaList}>
            <li>
              <span className='label'>Срок действия пакета:</span>
              <span className='value'>{packet.days} дней</span>
            </li>
            <li>
              <span className='label'>Стоимость:</span>
              {/* <span className='value'>{packet.price.replace('.00', '')} руб.</span> */}
              <span className='value'>FREE</span>
            </li>
            <li>
              <span className='label'>Пакет действует до:</span>
              <span className='value'>{packet.expire_date?.split('-').reverse().join('.')}</span>
            </li>
            {packetFeaturesLabels && (
              <li>
                {/* <span className='label'>Пакет включает:</span>
                <span className='value'>{packetFeaturesLabels.join(', ')}</span> */}
              </li>
            )}
            {/* <li className={styles.ActivePacketCard__AutoPaid}>
              <Form.Checkbox
                id='AutoPaid'
                className={styles.AutoPaidSwitch}
                type='switch'
                disabled={isLoading}
                checked={packet.autopay}
                label='Автоматичиская оплата пакета:'
                classNameLabel={classNames(styles.AutoPaidSwitch__Label)}
                onChange={handleChangeAutoPaid}
                reverse
              />
            </li> */}
            <li>
              <span className='label'>Описание:</span>
              {/* <span className='value'>{packet.short_description}</span> */}
              <span className='value'>{'Просмотр ТВ-каналов на смартфоне, планшете и телевизоре'}</span>
            </li>
          </ul>
        </div>
        <div className={styles.ActivePacketCard__Footer}>
          <div className={styles.ActivePacketCard__SubscriptionControls}>
            <span>Продлить подписку:</span>
            <PayPacketModal
              packet={packet}
              pageTitle='Продлить подписку'
              trigger={
                <Button size='sm' full>
                  ЕРИП
                </Button>
              }
            >
              <PayPacketErip packet={packet} />
            </PayPacketModal>
            <PayPacketModal
              packet={packet}
              pageTitle='Оформить подписку'
              trigger={
                <Button size='sm' full>
                  Карта
                </Button>
              }
            >
              <PayPacketCard packet={packet} />
            </PayPacketModal>
          </div>
        </div>
      </div>
    </div>
  )
})
ActivePacketCard.displayName = 'ActivePacketCard'

export default ActivePacketCard
