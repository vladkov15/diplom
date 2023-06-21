import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useMergedRefs from '@restart/hooks/useMergedRefs'
import DropdownContext from '@restart/ui/DropdownContext'
import { useDropdownToggle } from '@restart/ui/DropdownToggle'

import Button, { ButtonProps, CommonButtonProps } from '../button'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixRefForwardingComponent } from '@ui/helpers'
import useWrappedRefWithWarning from '@ui/hooks/useWrappedRefWithWarning'

import styles from './DropDown.module.scss'

export interface DropdownToggleProps extends Omit<ButtonProps, 'as'> {
  as?: React.ElementType
  caret?: boolean
  childPrefix?: string
}

type DropdownToggleComponent = PrefixRefForwardingComponent<'button', DropdownToggleProps>

export type PropsFromToggle = Partial<
  Pick<React.ComponentPropsWithRef<DropdownToggleComponent>, CommonButtonProps>
>

const propTypes = {
  prefix: PropTypes.string,
  id: PropTypes.string,
  caret: PropTypes.bool,
  as: PropTypes.elementType,
  childPrefix: PropTypes.string,
}

const DropdownToggle: DropdownToggleComponent = React.forwardRef<HTMLElement, DropdownToggleProps>(
  (
    { caret, className, childPrefix, as: Component = Button, ...props }: DropdownToggleProps,
    ref,
  ) => {
    const prefix = usePrefix(props.prefix, 'dropdown-toggle')
    const dropdownContext = useContext(DropdownContext)
    const [toggleProps] = useDropdownToggle()

    toggleProps.ref = useMergedRefs(
      toggleProps.ref,
      useWrappedRefWithWarning(ref, 'DropDownToggle'),
    )

    if (childPrefix !== undefined) props.prefix = childPrefix

    return (
      <Component
        className={classNames(
          className,
          styles[prefix],
          dropdownContext?.show && styles['show'],
          caret && styles['caret'],
        )}
        {...toggleProps}
        {...props}
      />
    )
  },
)

DropdownToggle.displayName = 'DropdownToggle'
DropdownToggle.propTypes = propTypes

export default DropdownToggle
