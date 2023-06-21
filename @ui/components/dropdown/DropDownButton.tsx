import React from 'react'
import PropTypes from 'prop-types'

import Dropdown, { DropdownProps } from './index'
import DropdownToggle, { PropsFromToggle } from './DropDownToggle'
import DropdownMenu from './DropDownMenu'

import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'
import { alignPropType } from '@ui/types'

export interface DropdownButtonProps
  extends Omit<DropdownProps, 'title'>,
    PropsFromToggle,
    PrefixProps {
  title: React.ReactNode
  menuRole?: string
  renderMenuOnMount?: boolean
  rootCloseEvent?: 'click' | 'mousedown'
  flip?: boolean
}

const propTypes = {
  id: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  align: alignPropType,
  menuRole: PropTypes.string,
  renderMenuOnMount: PropTypes.bool,
  rootCloseEvent: PropTypes.string,
  flip: PropTypes.bool,
  prefix: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
}

const DropdownButton: PrefixRefForwardingComponent<'div', DropdownButtonProps> = React.forwardRef<
  HTMLDivElement,
  DropdownButtonProps
>(
  (
    {
      title,
      children,
      prefix,
      rootCloseEvent,
      variant,
      size,
      menuRole,
      renderMenuOnMount,
      disabled,
      href,
      id,
      flip,
      ...props
    },
    ref,
  ) => (
    <Dropdown ref={ref} {...props}>
      <DropdownToggle
        id={id}
        href={href}
        size={size}
        variant={variant}
        disabled={disabled}
        childPrefix={prefix}
      >
        {title}
      </DropdownToggle>
      <DropdownMenu
        role={menuRole}
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
        flip={flip}
      >
        {children}
      </DropdownMenu>
    </Dropdown>
  ),
)

DropdownButton.displayName = 'DropdownButton'
DropdownButton.propTypes = propTypes

export default DropdownButton
