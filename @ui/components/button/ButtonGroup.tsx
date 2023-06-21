import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

export interface ButtonGroupProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  prefix: PropTypes.string,
  role: PropTypes.string,
  as: PropTypes.elementType,
}

const defaultProps = {
  role: 'group',
}

const ButtonGroup: PrefixRefForwardingComponent<'div', ButtonGroupProps> = React.forwardRef(
  ({ prefix: prefixProp, className, as: Component = 'div', ...rest }, ref) => {
    const prefix = usePrefix(prefixProp, 'btn-group')

    return <Component {...rest} ref={ref} className={classNames(className, prefix)} />
  },
)

ButtonGroup.displayName = 'ButtonGroup'
ButtonGroup.propTypes = propTypes
ButtonGroup.defaultProps = defaultProps

export default ButtonGroup
