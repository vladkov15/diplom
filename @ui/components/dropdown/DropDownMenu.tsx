import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDropdownMenu, UseDropdownMenuOptions } from '@restart/ui/DropdownMenu'
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect'
import useMergedRefs from '@restart/hooks/useMergedRefs'

import DropdownContext, { DropDirection } from './DropDownContext'

import { usePrefix } from '@ui/components/ThemeProvider'
import useWrappedRefWithWarning from '@ui/hooks/useWrappedRefWithWarning'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'
import { AlignType, AlignDirection, alignPropType, Placement } from '@ui/types'

import styles from './DropDown.module.scss'

export interface DropdownMenuProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  show?: boolean
  renderOnMount?: boolean
  flip?: boolean
  align?: AlignType
  rootCloseEvent?: 'click' | 'mousedown'
  popperConfig?: UseDropdownMenuOptions['popperConfig']
}

const propTypes = {
  prefix: PropTypes.string,
  show: PropTypes.bool,
  renderOnMount: PropTypes.bool,
  flip: PropTypes.bool,
  align: alignPropType,
  rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),
  as: PropTypes.elementType,
  popperConfig: PropTypes.object,
}

const defaultProps: Partial<DropdownMenuProps> = {
  flip: true,
}

export function getDropdownMenuPlacement(alignEnd: boolean, dropDirection?: DropDirection) {
  let placement: Placement = alignEnd ? 'bottom-end' : 'bottom-start'
  if (dropDirection === 'up') placement = alignEnd ? 'top-end' : 'top-start'
  else if (dropDirection === 'end') placement = alignEnd ? 'right-end' : 'right-start'
  else if (dropDirection === 'start') placement = alignEnd ? 'left-end' : 'left-start'
  else if (dropDirection === 'down-centered') placement = 'bottom'
  else if (dropDirection === 'up-centered') placement = 'top'
  return placement
}

const DropdownMenu: PrefixRefForwardingComponent<'div', DropdownMenuProps> = React.forwardRef<
  HTMLElement,
  DropdownMenuProps
>(
  (
    {
      prefix: prefixProp,
      className,
      align,
      rootCloseEvent,
      flip,
      show: showProps,
      renderOnMount,
      as: Component = 'div',
      popperConfig,
      ...props
    },
    ref,
  ) => {
    let alignEnd = false
    const prefix = usePrefix(prefixProp, 'dropdown-menu')
    const { align: contextAlign, drop } = useContext(DropdownContext)
    align = align || contextAlign

    const alignClasses: string[] = []
    if (align) {
      if (typeof align === 'object') {
        const keys = Object.keys(align)

        if (keys.length) {
          const brkPoint = keys[0]
          const direction: AlignDirection = align[brkPoint]

          alignEnd = direction === 'start'
          alignClasses.push(styles[`${prefix}-${brkPoint}-${direction}`])
        }
      } else if (align === 'end') alignEnd = true
    }

    const placement = getDropdownMenuPlacement(alignEnd, drop)

    const [menuProps, { hasShown, popper, show, toggle }] = useDropdownMenu({
      flip,
      rootCloseEvent,
      show: showProps,
      usePopper: alignClasses.length === 0,
      offset: [0, 0],
      popperConfig,
      placement,
    })

    menuProps.ref = useMergedRefs(useWrappedRefWithWarning(ref, 'DropdownMenu'), menuProps.ref)

    useIsomorphicEffect(() => {
      if (show) popper?.update()
    }, [show])

    if (!hasShown && !renderOnMount) return null

    if (typeof Component !== 'string') {
      menuProps.show = show
      menuProps.close = () => toggle?.(false)
      menuProps.align = align
    }

    let style = props.style
    let overrideProps = { ...props } as DropdownMenuProps & { 'x-placement'?: Placement }
    if (popper?.placement) {
      const top = style?.top || menuProps.style?.top || 0
      const bottom = style?.bottom || menuProps.style?.bottom || 0
      const right = style?.right || menuProps.style?.right || 0
      const left = style?.left || menuProps.style?.left || 0

      style = { ...props.style, ...menuProps.style, top, bottom, right, left }
      overrideProps['x-placement'] = popper.placement
    }

    return (
      <Component
        {...overrideProps}
        {...menuProps}
        style={style}
        {...(alignClasses.length && { 'data-popper': 'static' })}
        className={classNames(
          className,
          styles[prefix],
          show && styles['show'],
          alignEnd && styles[`${prefix}-end`],
          ...alignClasses,
        )}
      />
    )
  },
)

DropdownMenu.displayName = 'DropdownMenu'
DropdownMenu.propTypes = propTypes
DropdownMenu.defaultProps = defaultProps

export default DropdownMenu
