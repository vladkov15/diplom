import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import AccordionButton from './AccordionButton'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixRefForwardingComponent, PrefixProps } from '@ui/helpers'

import styles from './Accordion.module.scss'

export interface AccordionHeaderProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  as: PropTypes.elementType,
  prefix: PropTypes.string,
  onClick: PropTypes.func,
}

const AccordionHeader: PrefixRefForwardingComponent<'h2', AccordionHeaderProps> = React.forwardRef<
  HTMLElement,
  AccordionHeaderProps
>(({ as: Component = 'h2', prefix: prefixProp, className, children, onClick, ...props }, ref) => {
  const prefix = usePrefix(prefixProp, 'accordion-header')

  return (
    <Component ref={ref} {...props} className={classNames(className, styles[prefix])}>
      <AccordionButton onClick={onClick}>{children}</AccordionButton>
    </Component>
  )
})

AccordionHeader.propTypes = propTypes
AccordionHeader.displayName = 'AccordionHeader'

export default AccordionHeader
