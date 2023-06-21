import React, { FC } from 'react'

import List from '@ui/components/list'
import { Resolution } from '@/modules/player/components/PlayerUrlManager'

import styles from './ResolutionListGroup.module.scss'

export interface ResolutionListGroupProps {
  resolution: Resolution | null
  resolutions: Resolution[]
  onChange?: (resolution: Resolution) => void
}

const ResolutionListGroup: FC<ResolutionListGroupProps> = ({
  resolution: bitrateProp,
  resolutions,
  onChange,
}) => {
  return (
    <div className={styles.ResolutionListGroup}>
      <h3 className={styles.ResolutionListGroup__Title}>Качество</h3>
      <div className={styles.ResolutionListGroup__List}>
        <List variant='flush'>
          {resolutions.map((resolution) => (
            <List.Item
              active={bitrateProp?.id === resolution.id}
              onClick={() => onChange?.(resolution)}
              key={resolution.id}
              action
            >
              {resolution.label}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  )
}

export default ResolutionListGroup
