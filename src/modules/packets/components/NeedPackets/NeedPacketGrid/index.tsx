import React, { FC } from 'react'

import NeedPacketCard from '../NeedPacketCard'

import { IPacket } from '@/modules/packets/packet.model'

import styles from './NeedPacketGrid.module.scss'

interface NeedPacketGridProps {
  packets: IPacket[]
}

const NeedPacketGrid: FC<NeedPacketGridProps> = React.memo(({ packets }) => {
  return (
    <div className={styles.NeedPacketGrid}>
      {packets?.map((packet) => (
        <NeedPacketCard packet={packet} key={packet.id} />
      ))}
    </div>
  )
})
NeedPacketGrid.displayName = 'NeedPacketGrid'

export default NeedPacketGrid
