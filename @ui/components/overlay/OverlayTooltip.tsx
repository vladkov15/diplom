import React, { FC } from 'react'

import OverlayTrigger, { OverlayTriggerProps, OverlayTriggerType } from './OverlayTrigger'
import Tooltip from '../tooltip/Tooltip'

import { Placement } from '@ui/types'

interface OverlayTooltipProps extends Omit<OverlayTriggerProps, 'children' | 'overlay'> {
  content: React.ReactNode
  children: React.ReactElement
}

const defaultProps = {
  delay: 100,
  trigger: ['hover', 'focus'] as OverlayTriggerType[],
  placement: 'bottom' as Placement,
}

const OverlayTooltip: FC<OverlayTooltipProps> = ({ content, children, ...props }) => {
  return (
    <OverlayTrigger {...props} overlay={(props) => <Tooltip {...props}>{content}</Tooltip>}>
      {children}
    </OverlayTrigger>
  )
}

OverlayTooltip.displayName = 'OverlayTooltip'
OverlayTooltip.defaultProps = defaultProps

export default OverlayTooltip
