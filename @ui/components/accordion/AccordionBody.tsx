import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { TransitionCallbacks } from '@restart/ui/types'

import AccordionCollapse from './AccordionCollapse'
import AccordionItemContext from './AccordionItemContext'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixRefForwardingComponent, PrefixProps } from '@ui/helpers'

import styles from './Accordion.module.scss'

export interface AccordionBodyProps
  extends PrefixProps,
    TransitionCallbacks,
    React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  as: PropTypes.elementType,
  prefix: PropTypes.string,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
}

const AccordionBody: PrefixRefForwardingComponent<'div', AccordionBodyProps> = React.forwardRef<
  HTMLElement,
  AccordionBodyProps
>(
  (
    {
      as: Component = 'div',
      prefix: prefixProp,
      className,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...props
    },
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'accordion-body')
    const { eventKey } = useContext(AccordionItemContext)

    return (
      <AccordionCollapse
        eventKey={eventKey}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        <Component ref={ref} {...props} className={classNames(className, styles[prefix])} />
      </AccordionCollapse>
    )
  },
)

AccordionBody.propTypes = propTypes
AccordionBody.displayName = 'AccordionBody'

export default AccordionBody
