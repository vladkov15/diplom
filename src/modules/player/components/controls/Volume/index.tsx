import React, { FC } from 'react'
import classNames from 'classnames'

import { Button } from '@ui'

import Range from '../../generic/Range'

import styles from './Volume.module.scss'

interface VolumeProps extends React.HTMLAttributes<HTMLDivElement> {
  volume: number
  isMuted: boolean
  changeVolume: (value: string | number) => void
  toggleMute: () => void
}

const Volume: FC<VolumeProps> = React.memo(
  ({ className, volume, isMuted, changeVolume, toggleMute }) => {
    return (
      <div className={classNames(className, styles.Volume)}>
        <Button
          className={styles.Volume__Button}
          variant='outline-info'
          onClick={toggleMute}
          size='sm'
          icon
        >
          <i
            className={classNames({
              'icon-volume-off': isMuted,
              'icon-volume-down': volume < 0.5,
              'icon-volume-up': volume >= 0.5,
            })}
          />
        </Button>

        <Range
          className={styles.Volume__Range}
          value={volume * 100}
          onValueChange={changeVolume}
          appendOuterContent={
            <div className={styles.Volume__Volume}>{Math.round(volume * 100)}</div>
          }
        />
      </div>
    )
  },
)
Volume.displayName = 'Volume'

export default Volume
