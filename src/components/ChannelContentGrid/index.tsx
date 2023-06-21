import React, { FC } from 'react'

import { IChannel } from '@/modules/channel/channel.model'

import styles from './ChannelContentGrid.module.scss'

interface ChannelContentGridProps {
  items: IChannel[]
  loading: boolean
  itemRenderFn: (item: IChannel, index: number, items: IChannel[]) => React.ReactNode
}

const ChannelContentGrid: FC<ChannelContentGridProps> = ({ items, itemRenderFn }) => {
  return (
    <div className={styles.ChannelContentGrid}>
      <div className={styles.ChannelContentGrid__Body}>{items.map(itemRenderFn)}</div>
    </div>
  )
}

export default ChannelContentGrid
