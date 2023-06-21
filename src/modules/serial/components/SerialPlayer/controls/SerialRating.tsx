import React, { FC } from 'react'

import Rating from '@/modules/player/components/controls/Rating'

import { IEpisode } from '@/modules/serial/serial.model'
import { useSendSerialUserRatingMutation } from '@/modules/serial/serial.api'

interface SerialRatingProps {
  episode: IEpisode
}

const SerialRating: FC<SerialRatingProps> = React.memo(({ episode }) => {
  const [sendSerialUserRating] = useSendSerialUserRatingMutation()

  const handleChange = (value: number) => {
    const data = { item_ptr: episode.id, rating: value }
    sendSerialUserRating({ data })
  }

  return <Rating value={0} onChange={handleChange} />
})
SerialRating.displayName = 'SerialRating'

export default SerialRating
