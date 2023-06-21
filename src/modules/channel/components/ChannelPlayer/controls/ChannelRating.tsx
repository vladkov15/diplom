import React, { FC } from 'react'

import Rating from '@/modules/player/components/controls/Rating'

import { IChannel } from '@/modules/channel/channel.model'
import { useSendChannelUserRatingMutation } from '@/modules/channel/channel.api'

interface ChannelRatingProps {
  channel: IChannel
}

const ChannelRating: FC<ChannelRatingProps> = React.memo(({ channel }) => {
  const [sendChannelUserRating] = useSendChannelUserRatingMutation()

  const handleChange = (value: number) => {
    const data = { item_ptr: channel.id, rating: value }
    sendChannelUserRating({ data })
  }

  return <Rating value={0} onChange={handleChange} />
})
ChannelRating.displayName = 'ChannelRating'

export default ChannelRating
