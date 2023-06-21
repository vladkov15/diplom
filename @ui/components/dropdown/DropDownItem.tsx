import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BaseDropdownItem, {
  useDropdownItem,
  DropdownItemProps as BaseDropdownItemProps,
} from '@restart/ui/DropdownItem'
import Anchor from '@restart/ui/Anchor'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './DropDown.module.scss'

export interface DropdownItemProps extends PrefixProps, BaseDropdownItemProps {}

const propTypes = {
  prefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  href: PropTypes.string,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
}

const DropdownItem: PrefixRefForwardingComponent<typeof BaseDropdownItem, DropdownItemProps> =
  React.forwardRef(
    (
      {
        prefix: prefixProp,
        className,
        eventKey,
        disabled = false,
        onClick,
        active,
        as: Component = Anchor,
        ...props
      },
      ref,
    ) => {
      const prefix = usePrefix(prefixProp, 'dropdown-item')

      const [dropdownItemProps, meta] = useDropdownItem({
        key: eventKey,
        href: props.href,
        disabled,
        onClick,
        active,
      })

      return (
        <Component
          {...props}
          {...dropdownItemProps}
          ref={ref}
          className={classNames(
            className,
            styles[prefix],
            meta.isActive && styles['active'],
            disabled && styles['disabled'],
          )}
        />
      )
    },
  )

DropdownItem.displayName = 'DropdownItem'
DropdownItem.propTypes = propTypes

export default DropdownItem
