import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useUncontrolled } from 'uncontrollable'

import AccordionBody from './AccordionBody'
import AccordionButton from './AccordionButton'
import AccordionCollapse from './AccordionCollapse'
import AccordionContext, { AccordionSelectCallback, AccordionEventKey } from './AccordionContext'
import AccordionHeader from './AccordionHeader'
import AccordionItem from './AccordionItem'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './Accordion.module.scss'

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>,
    PrefixProps {
  activeKey?: AccordionEventKey
  defaultActiveKey?: AccordionEventKey
  onSelect?: AccordionSelectCallback
  accordion?: boolean
}

const propTypes = {
  as: PropTypes.elementType,
  prefix: PropTypes.string,
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onSelect: PropTypes.func,
  accordion: PropTypes.bool,
}

const Accordion: PrefixRefForwardingComponent<'div', AccordionProps> = React.forwardRef<
  HTMLElement,
  AccordionProps
>((props, ref) => {
  const {
    as: Component = 'div',
    activeKey,
    prefix: prefixProp,
    className,
    onSelect,
    accordion = true,
    ...controlledProps
  } = useUncontrolled(props, { activeKey: 'onSelect' })

  const prefix = usePrefix(prefixProp, 'accordion')
  const contextValue = useMemo(
    () => ({
      activeEventKey: activeKey,
      onSelect,
      accordion,
    }),
    [activeKey, onSelect, accordion],
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      <Component ref={ref} {...controlledProps} className={classNames(className, styles[prefix])} />
    </AccordionContext.Provider>
  )
})

Accordion.displayName = 'Accordion'
Accordion.propTypes = propTypes

export default Object.assign(Accordion, {
  Button: AccordionButton,
  Collapse: AccordionCollapse,
  Item: AccordionItem,
  Header: AccordionHeader,
  Body: AccordionBody,
})
