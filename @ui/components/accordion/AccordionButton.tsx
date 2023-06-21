import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import AccordionContext, { isAccordionItemSelected, AccordionEventKey } from './AccordionContext'
import AccordionItemContext from './AccordionItemContext'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './Accordion.module.scss'

type EventHandler = React.EventHandler<React.SyntheticEvent>

export interface AccordionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PrefixProps {}

const propTypes = {
  as: PropTypes.elementType,
  prefix: PropTypes.string,
  onClick: PropTypes.func,
}

export function useAccordionButton(eventKey: string, onClick?: EventHandler): EventHandler {
  const { activeEventKey, onSelect, accordion } = useContext(AccordionContext)

  return (e) => {
    let eventKeyPassed: AccordionEventKey = eventKey === activeEventKey ? null : eventKey
    if (!accordion) {
      if (Array.isArray(activeEventKey)) {
        if (activeEventKey.includes(eventKey)) {
          eventKeyPassed = activeEventKey.filter((key) => key !== eventKey)
        } else {
          eventKeyPassed = [...activeEventKey, eventKey]
        }
      } else {
        eventKeyPassed = [eventKey]
      }
    }

    onSelect?.(eventKeyPassed, e)
    onClick?.(e)
  }
}

const AccordionButton: PrefixRefForwardingComponent<'div', AccordionButtonProps> = React.forwardRef<
  HTMLButtonElement,
  AccordionButtonProps
>(({ as: Component = 'button', prefix: prefixProp, className, onClick, ...props }, ref) => {
  const prefix = usePrefix(prefixProp, 'accordion-button')

  const { eventKey } = useContext(AccordionItemContext)
  const { activeEventKey } = useContext(AccordionContext)

  const accordionOnClick = useAccordionButton(eventKey, onClick)

  if (Component === 'button') props.type = 'button'

  return (
    <Component
      ref={ref}
      onClick={accordionOnClick}
      {...props}
      aria-expanded={eventKey === activeEventKey}
      className={classNames(
        className,
        styles[prefix],
        !isAccordionItemSelected(activeEventKey, eventKey) && styles[`${prefix}--collapsed`],
      )}
    />
  )
})

AccordionButton.propTypes = propTypes
AccordionButton.displayName = 'AccordionButton'

export default AccordionButton
