import React, { FC } from 'react'

import PacketCard from '@/modules/packets/components/PacketCard'

import { IPacket } from '../../packet.model'

import styles from './PacketGrid.module.scss'

interface PacketGridProps {
  packets: IPacket[]
}

const PacketGrid: FC<PacketGridProps> = React.memo(({ packets }) => {
  return (
    <div className={styles.PacketGrid}>
      {packets?.map((packet) => (
        <PacketCard packet={packet} key={packet.id} />
      ))}
    </div>
  )
})
PacketGrid.displayName = 'PacketGrid'

export default PacketGrid
