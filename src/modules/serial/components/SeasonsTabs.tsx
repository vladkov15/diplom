import React, { FC, useContext } from 'react'

import Tabs from '@ui/components/tabs'

import { SerialContext } from '@/modules/serial/serial.context'

import EpisodeSlider from './EpisodeSlider'
import { ISeason } from '../serial.model'

interface SeasonsTabsProps {
  seasons: ISeason[]
}

const SeasonsTabs: FC<SeasonsTabsProps> = ({ seasons }) => {
  const { seasonId, changeSeasonId } = useContext(SerialContext)

  const onSelectSeason = (eventKey: string | null) => {
    eventKey && changeSeasonId(Number(eventKey))
  }

  return (
    <Tabs activeKey={seasonId} onSelect={onSelectSeason}>
      {seasons.map((season) => (
        <Tabs.Tab
          id={season.name}
          eventKey={season.id}
          title={`${season.number} сезон`}
          key={season.id}
        >
          <EpisodeSlider />
        </Tabs.Tab>
      ))}
    </Tabs>
  )
}

export default SeasonsTabs
