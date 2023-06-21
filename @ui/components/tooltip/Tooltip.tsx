import React from 'react'
import classNames from 'classnames'
import { OverlayArrowProps } from '@restart/ui/Overlay'

import { usePrefix } from '@ui/components/ThemeProvider'
import { Placement } from '@ui/types'
import { PrefixProps, getOverlayDirection } from '@ui/helpers'

import styles from './Tooltip.module.scss'

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement>, PrefixProps {
  placement?: Placement
  arrowProps?: Partial<OverlayArrowProps>
  show?: boolean
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    { prefix: prefixProp, placement, className, style, children, arrowProps, show, ...props },
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'tooltip')

    const [primaryPlacement] = placement?.split('-') || []
    const direction = getOverlayDirection(primaryPlacement)

    return (
      <div
        ref={ref}
        style={style}
        role='tooltip'
        x-placement={primaryPlacement}
        className={classNames(
          className,
          styles[prefix],
          styles[`tooltip-${direction}`],
          show ? styles.show : '',
        )}
        {...props}
      >
        <div className={styles[`${prefix}-arrow`]} {...arrowProps} />
        <div className={styles[`${prefix}-inner`]}>{children}</div>
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'

export default Tooltip
