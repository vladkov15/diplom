import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './Alert.module.scss'

interface AlertContainerProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  prefix: PropTypes.string,
}

const AlertContainer: PrefixRefForwardingComponent<'div', AlertContainerProps> = React.forwardRef<
  HTMLDivElement,
  AlertContainerProps
>(({ prefix: prefixProp, className, as: Component = 'div', ...props }, ref) => {
  const prefix = usePrefix(prefixProp, 'alert-container')

  return <Component ref={ref} {...props} className={classNames(className, styles[prefix])} />
})

AlertContainer.displayName = 'AlertContainer'
AlertContainer.propTypes = propTypes

export default AlertContainer
