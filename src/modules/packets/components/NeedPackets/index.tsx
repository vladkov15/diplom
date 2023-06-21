import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { Button } from '@ui'
import NeedPacketGrid from './NeedPacketGrid'

import { IPacket } from '@/modules/packets/packet.model'

import styles from './NeedPackets.module.scss'

interface NeedPacketsProps {
  packets?: IPacket[]
  children: React.ReactNode
}

const NeedPackets: FC<NeedPacketsProps> = React.memo(({ packets, children }) => {
  const router = useRouter()

  if (!packets) return <>{children}</>

  return (
    <div className={styles.NeedPackets}>
      <h2 className={styles.NeedPackets__Title}>Меню подписок</h2>
      <p className={styles.NeedPackets__Description}>
        Чтобы смотреть этот контент, нужно приобрести одну из подписок
      </p>
      <NeedPacketGrid packets={packets} />
      <Button
        className={styles.NeedPackets__Action}
        onClick={() => router.push('/cabinet/packets')}
      >
        Перейти к подпискам
      </Button>
    </div>
  )
})
NeedPackets.displayName = 'NeedPackets'

export default NeedPackets
