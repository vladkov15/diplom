import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import AccordionItemContext, { AccordionItemContextValue } from './AccordionItemContext'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixRefForwardingComponent, PrefixProps } from '@ui/helpers'

import styles from './Accordion.module.scss'

export interface AccordionItemProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  eventKey: string
}

const propTypes = {
  as: PropTypes.elementType,
  prefix: PropTypes.string,
  eventKey: PropTypes.string.isRequired,
}

const AccordionItem: PrefixRefForwardingComponent<'div', AccordionItemProps> = React.forwardRef<
  HTMLElement,
  AccordionItemProps
>(({ as: Component = 'div', prefix: prefixProp, className, eventKey, ...props }, ref) => {
  const prefix = usePrefix(prefixProp, 'accordion-item')
  const contextValue = useMemo<AccordionItemContextValue>(() => ({ eventKey }), [eventKey])

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <Component ref={ref} {...props} className={classNames(className, styles[prefix])} />
    </AccordionItemContext.Provider>
  )
})

AccordionItem.propTypes = propTypes
AccordionItem.displayName = 'AccordionItem'

export default AccordionItem
