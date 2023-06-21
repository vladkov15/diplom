import React, { FC } from 'react'
import dynamic from 'next/dynamic'

import { PlayerProps } from '@/modules/player/components/Player'
import PlayerSkeleton from '@/modules/player/components/PlayerSkeleton'

const Player = dynamic(() => import('@/modules/player/components/Player'), {
  ssr: false,
  loading: () => <PlayerSkeleton loading />,
})

interface TrailerPlayerProps extends Omit<PlayerProps, 'url'> {
  trailer: string
}

const TrailerPlayer: FC<TrailerPlayerProps> = ({ trailer, ...props }) => {
  return <Player url={trailer} {...props} autoPlay />
}

export default TrailerPlayer
