import React, { FC } from 'react'
import styled from 'styled-components'

import { IPacket } from '../../../packet.model'

import styles from './NeedPacketCard.module.scss'

interface NeedPacketCardProps {
  packet: IPacket
}

const NeedPacketCard: FC<NeedPacketCardProps> = React.memo(({ packet, ...props }) => {
  return (
    <div className={styles.NeedPacketCard}>
      <img className={styles.NeedPacketCard__Image} src={packet.image} />
      <h3 className={styles.NeedPacketCard__Title}>{packet.name}</h3>
    </div>
  )
})
NeedPacketCard.displayName = 'NeedPacketCard'

export default NeedPacketCard
