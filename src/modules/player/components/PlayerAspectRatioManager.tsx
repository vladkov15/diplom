import React from 'react'

import AspectRatio, { AspectRatioProps } from '@/components/AspectRatio'

interface PlayerAspectRatioProps extends Omit<AspectRatioProps, 'children'> {
  children: () => React.ReactElement
}

const PlayerAspectRatioManager = ({ children, ...props }: PlayerAspectRatioProps) => {
  return <AspectRatio {...props}>{children()}</AspectRatio>
}

export default PlayerAspectRatioManager
