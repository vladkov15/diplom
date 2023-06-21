import React, { FC } from 'react'

import ActivePacketCard from '../ActivePacketCard'

import { IPacket } from '../../packet.model'

import styles from './ActivePacketList.module.scss'

interface ActivePacketListProps {
  packets: IPacket[]
}

const ActivePacketList: FC<ActivePacketListProps> = React.memo(({ packets }) => {
  return (
    <div className={styles.ActivePacketList}>
      {/* {packets?.map((packet) => (
        <ActivePacketCard packet={packet} key={packet.id} />
      ))} */}
      <ActivePacketCard packet={packets[0]} key={packets[0].id} />
    </div>
  )
})
ActivePacketList.displayName = 'ActivePacketList'

export default ActivePacketList
