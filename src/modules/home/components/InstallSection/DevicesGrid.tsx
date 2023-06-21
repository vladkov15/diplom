import React, { FC } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import styles from './DevicesGrid.module.scss'

interface IDevice {
  id: number | string
  image?: string
  title: string
  description: string | React.ReactNode | React.ReactNode[]
}

interface DevicesGridProps {
  title: string
  items: IDevice[]
  children?: React.ReactNode
}

const DevicesGrid: FC<DevicesGridProps> = ({ title, items }) => {
  return (
    <div className={styles.DevicesGrid}>
      <div className={cn(styles.DevicesGrid__Column, styles.DevicesGrid__ColumnTitle)}>
        <div className={styles.DevicesGrid__Header}>
          <h2 className={styles.DevicesGrid__Title}>{title}</h2>
        </div>
      </div>
      {items.map((item) => (
        <div className={styles.DevicesGrid__Column} key={item.id}>
          <div className={styles.DevicesGrid__Header}>
            <h2 className={styles.DevicesGrid__Title}>{item.title}</h2>
          </div>
          <div className={styles.DevicesGrid__Body}>
            {item.image && (
              <div className={styles.DevicesGrid__ImageContainer}>
                <Image src={item.image} width='120' height='160' alt={item.title} />
              </div>
            )}
            <div className={styles.DevicesGrid__Description}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DevicesGrid
