import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useUncontrolled } from 'uncontrollable'
import BaseDropdown, {
  DropdownProps as BaseDropdownProps,
  ToggleMetadata,
} from '@restart/ui/Dropdown'
import useEventCallback from '@restart/hooks/useEventCallback'

import DropdownContext, { DropDirection } from './DropDownContext'
import DropdownItem from './DropDownItem'
import DropdownMenu, { getDropdownMenuPlacement } from './DropDownMenu'
import DropdownToggle from './DropDownToggle'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'
import { AlignType, alignPropType } from '@ui/types'
import createWithPrefix from '@ui/utils/createWithPrefix'

import styles from './DropDown.module.scss'

const DropdownHeader = createWithPrefix('dropdown-header', {
  defaultProps: { role: 'heading' },
  className: styles['dropdown-header'],
})

const DropdownDivider = createWithPrefix('dropdown-divider', {
  Component: 'hr',
  defaultProps: { role: 'separator' },
  className: styles['dropdown-divider'],
})

const DropdownItemText = createWithPrefix(styles['dropdown-item-text'], { Component: 'span' })

export interface DropdownProps
  extends BaseDropdownProps,
    PrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'children'> {
  drop?: DropDirection
  align?: AlignType
  autoClose?: boolean | 'outside' | 'inside'
}

const propTypes = {
  prefix: PropTypes.string,
  drop: PropTypes.oneOf<DropDirection>([
    'up',
    'up-centered',
    'start',
    'end',
    'down',
    'down-centered',
  ]),
  as: PropTypes.elementType,
  align: alignPropType,
  show: PropTypes.bool,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  autoClose: PropTypes.oneOf([true, 'outside', 'inside', false]),
}

const defaultProps: Partial<DropdownProps> = {
  align: 'start',
  autoClose: true,
  drop: 'down',
}

const Dropdown: PrefixRefForwardingComponent<'div', DropdownProps> = React.forwardRef<
  HTMLElement,
  DropdownProps
>((pProps, ref) => {
  const {
    prefix: prefixProp,
    drop = 'down',
    show,
    className,
    align,
    onSelect,
    onToggle,
    as: Component = 'div',
    autoClose,
    ...props
  } = useUncontrolled(pProps, { show: 'onToggle' })

  const prefix = usePrefix(prefixProp, 'dropdown')

  const isClosingPermitted = (source: string): boolean => {
    if (autoClose === false) return source === 'click'
    if (autoClose === 'inside') return source !== 'rootClose'
    if (autoClose === 'outside') return source !== 'select'
    return true
  }

  const handleToggle = useEventCallback((nextShow: boolean, meta: ToggleMetadata) => {
    if (
      meta.originalEvent?.currentTarget === document &&
      (meta.source !== 'keydown' || (meta.originalEvent as KeyboardEvent).key === 'Escape')
    ) {
      meta.source = 'rootClose'
    }

    if (isClosingPermitted(meta.source!)) onToggle?.(nextShow, meta)
  })

  const alignEnd = align === 'end'
  const placement = getDropdownMenuPlacement(alignEnd, drop)

  const contextValue = useMemo(() => ({ align, drop }), [align, drop])

  const directionClasses = {
    down: styles[prefix],
    'down-centered': styles[`${prefix}-center`],
    up: styles['dropup'],
    'up-centered': styles['dropup-center dropup'],
    end: styles['dropend'],
    start: styles['dropstart'],
  }

  return (
    <DropdownContext.Provider value={contextValue}>
      <BaseDropdown
        placement={placement}
        show={show}
        onSelect={onSelect}
        onToggle={handleToggle}
        itemSelector={`.${prefix}-item:not(.disabled):not(:disabled)`}
      >
        <Component
          {...props}
          ref={ref}
          className={classNames(className, show && styles['show'], directionClasses[drop])}
        />
      </BaseDropdown>
    </DropdownContext.Provider>
  )
})

Dropdown.displayName = 'Dropdown'
Dropdown.propTypes = propTypes
Dropdown.defaultProps = defaultProps

export default Object.assign(Dropdown, {
  Toggle: DropdownToggle,
  Menu: DropdownMenu,
  Item: DropdownItem,
  ItemText: DropdownItemText,
  Divider: DropdownDivider,
  Header: DropdownHeader,
})
