import React, { FC } from 'react'

import List from '@ui/components/list'
import { Language } from '@/modules/player/components/PlayerUrlManager'

import styles from './LanguageListGroup.module.scss'

export interface LanguageListGroupProps {
  language: Language | null
  languages: Language[]
  onChange?: (language: Language) => void
}

const LanguageListGroup: FC<LanguageListGroupProps> = ({
  language: audioTrackProp,
  languages,
  onChange,
}) => {
  return (
    <div className={styles.LanguageListGroup}>
      <h3 className={styles.LanguageListGroup__Title}>Озвучка</h3>
      <div className={styles.LanguageListGroup__List}>
        <List variant='flush'>
          {languages.map((language) => (
            <List.Item
              active={audioTrackProp?.id === language.id}
              onClick={() => onChange?.(language)}
              key={language.id}
              action
            >
              {language.label}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  )
}

export default LanguageListGroup
