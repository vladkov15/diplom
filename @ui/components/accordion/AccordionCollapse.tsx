import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

import Collapse, { CollapseProps } from '../Collapse'
import AccordionContext, { isAccordionItemSelected } from './AccordionContext'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixRefForwardingComponent, PrefixProps } from '@ui/helpers'

import styles from './Accordion.module.scss'

export interface AccordionCollapseProps extends PrefixProps, CollapseProps {
  eventKey: string
}

const propTypes = {
  as: PropTypes.elementType,
  eventKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

const AccordionCollapse: PrefixRefForwardingComponent<'div', AccordionCollapseProps> =
  React.forwardRef<Transition<HTMLElement>, AccordionCollapseProps>(
    (
      { as: Component = 'div', prefix: prefixProp, className, children, eventKey, ...props },
      ref,
    ) => {
      const { activeEventKey } = useContext(AccordionContext)
      const prefix = usePrefix(prefixProp, 'accordion-collapse')

      return (
        <Collapse
          ref={ref}
          in={isAccordionItemSelected(activeEventKey, eventKey)}
          {...props}
          className={classNames(className, styles[prefix])}
        >
          <Component>{React.Children.only(children)}</Component>
        </Collapse>
      )
    },
  )

AccordionCollapse.propTypes = propTypes
AccordionCollapse.displayName = 'AccordionCollapse'

export default AccordionCollapse
