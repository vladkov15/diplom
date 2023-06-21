import React, { FC, useCallback } from 'react'

import { Button } from '@ui'

import ResolutionListGroup from './ResolutionListGroup'
import LanguageListGroup from './LanguageListGroup'

import { ControlDropdown } from '@/modules/player/components/generic'
import { Resolution, Language } from '@/modules/player/components/PlayerUrlManager'

const PlayerUrlSettingsDropdownTrigger = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <Button ref={ref} variant='icon' size='sm' icon {...props}>
    <i className='icon-settings' />
  </Button>
))
PlayerUrlSettingsDropdownTrigger.displayName = 'PlayerUrlSettingsDropdownTrigger'

interface PlayerUrlSettingsProps {
  resolution: Resolution | null
  resolutions: Resolution[]
  language: Language | null
  languages: Language[]
  changeResolution: (resolution: Resolution) => void
  changeLanguage: (language: Language) => void
  children?: React.ReactNode
}

const PlayerUrlSettings: FC<PlayerUrlSettingsProps> = React.memo(
  ({
    resolution,
    resolutions,
    changeResolution,
    language,
    languages,
    changeLanguage,
    children,
  }) => {
    const handleChangeResolution = useCallback(changeResolution, [])
    const handleChangeLanguage = useCallback(changeLanguage, [])

    if (!resolutions.length && !resolutions.length) return null

    return (
      <ControlDropdown trigger={PlayerUrlSettingsDropdownTrigger} bodyStyle={{ minWidth: 160 }}>
        {!!resolutions.length && (
          <ResolutionListGroup
            resolution={resolution}
            resolutions={resolutions}
            onChange={handleChangeResolution}
          />
        )}
        {!!languages.length && (
          <LanguageListGroup
            language={language}
            languages={languages}
            onChange={handleChangeLanguage}
          />
        )}
        {children}
      </ControlDropdown>
    )
  },
)
PlayerUrlSettings.displayName = 'PlayerUrlSettings'

export default PlayerUrlSettings
