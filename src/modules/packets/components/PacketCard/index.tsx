import React, { FC } from 'react'
import styled from 'styled-components'

import { IPacket } from '../../packet.model'

import Button from '@ui/components/button'
import PayPacketModal from '@/modules/packets/components/PayPacketModal'
import PayPacketErip from '@/modules/packets/components/PayPacketErip'
import PayPacketCard from '@/modules/packets/components/PayPacketCard'

import styles from './PacketCard.module.scss'

interface PacketCardProps {
  packet: IPacket
}

const PacketCard: FC<PacketCardProps> = React.memo(({ packet, ...props }) => {
  return (
    <PacketCardStyled className={styles.PacketCard} bg={packet.image}>
      <div className={styles.PacketCard__InnerContainer}>
        <div className={styles.PacketCard__Header}>
          <h3 className={styles.PacketCard__Title}>{packet.name}</h3>
          <p className={styles.PacketCard__Description}>{packet.short_description}</p>
        </div>
        <div className={styles.PacketCard__Body}>
          {packet.features && (
            <ul className={styles.PacketFeatureList}>
              {packet.features.map((feature) => (
                <li key={feature.label}>
                  <span>{feature.label}</span>
                  {feature.value ? (
                    <img src='/assets/img/icons/check.svg' />
                  ) : (
                    <img src='/assets/img/icons/not_check.svg' />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.PacketCard__Footer}>
          <div className={styles.PacketCard__Price}>
            {packet.price.replace('.00', '')} руб. / {packet.days} дней
          </div>
          <div className={styles.PacketCard__SubscriptionControls}>
            <PayPacketModal
              packet={packet}
              pageTitle='Оформить подписку'
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
    </PacketCardStyled>
  )
})
PacketCard.displayName = 'PacketCard'

interface PacketCardStyledProps {
  bg: string
}

const PacketCardStyled = styled.div<PacketCardStyledProps>`
  background-image: url(${(props) => props.bg});
`

export default PacketCard
