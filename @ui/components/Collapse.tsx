import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from 'dom-helpers/css'
import Transition, {
  TransitionStatus,
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition'
import { TransitionCallbacks } from '@restart/ui/types'

import transitionEndListener from '../utils/transitionEndListener'
import createChainedFunction from '../utils/createChainedFunction'
import triggerBrowserReflow from '../utils/triggerBrowserReflow'

import TransitionWrapper from './TransitionWrapper'

type Dimension = 'height' | 'width'
type OffsetDimension = 'offsetHeight' | 'offsetWidth'
type ScrollDimension = 'scrollHeight' | 'scrollWidth'
type Margin = 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight'

export interface CollapseProps
  extends TransitionCallbacks,
    Pick<React.HTMLAttributes<HTMLElement>, 'role'> {
  className?: string
  in?: boolean
  mountOnEnter?: boolean
  unmountOnExit?: boolean
  appear?: boolean
  timeout?: number
  dimension?: Dimension | (() => Dimension)
  getDimensionValue?: (dimension: Dimension, element: HTMLElement) => number
  children: React.ReactElement
}

const MARGINS: { [d in Dimension]: string[] } = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
}

const capitalized = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

function getDefaultDimensionValue(dimension: Dimension, elem: HTMLElement): number {
  const offset = `offset${capitalized(dimension)}` as OffsetDimension
  const value = elem[offset] as number
  const margins = MARGINS[dimension] as Margin[]

  return (
    value +
    parseInt(css(elem, margins[0]) as string, 10) +
    parseInt(css(elem, margins[1]) as string, 10)
  )
}

const collapseStyles = {
  [EXITED]: 'collapse',
  [EXITING]: 'collapsing',
  [ENTERING]: 'collapsing',
  [ENTERED]: 'collapse show',
}

const propTypes = {
  in: PropTypes.bool,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  appear: PropTypes.bool,
  timeout: PropTypes.number,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  dimension: PropTypes.oneOfType([PropTypes.oneOf(['height', 'width']), PropTypes.func]),
  getDimensionValue: PropTypes.func,
  role: PropTypes.string,
  children: PropTypes.element.isRequired,
}

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  getDimensionValue: getDefaultDimensionValue,
}

const Collapse = React.forwardRef<Transition<any>, CollapseProps>(
  (
    {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      className,
      children,
      dimension = 'height',
      getDimensionValue = getDefaultDimensionValue,
      ...props
    },
    ref,
  ) => {
    /* Compute dimension */
    const computedDimension = typeof dimension === 'function' ? dimension() : dimension

    /* -- Expanding -- */
    const handleEnter = useMemo(() => {
      return createChainedFunction((elem: HTMLElement) => {
        elem.style[computedDimension] = '0'
      }, onEnter)
    }, [computedDimension, onEnter])

    const handleEntering = useMemo(() => {
      return createChainedFunction((elem: HTMLElement) => {
        const scroll = `scroll${capitalized(computedDimension)}` as ScrollDimension
        elem.style[computedDimension] = `${elem[scroll]}px`
      }, onEntering)
    }, [computedDimension, onEntering])

    const handleEntered = useMemo(() => {
      return createChainedFunction((elem: HTMLElement) => {
        elem.style[computedDimension] = ''
      }, onEntered)
    }, [computedDimension, onEntered])

    /* -- Collapsing -- */
    const handleExit = useMemo(() => {
      return createChainedFunction((elem: HTMLElement) => {
        elem.style[computedDimension] = `${getDimensionValue(computedDimension, elem)}px`
        triggerBrowserReflow(elem)
      }, onExit)
    }, [onExit, getDimensionValue, computedDimension])
    const handleExiting = useMemo(() => {
      return createChainedFunction((elem: HTMLElement) => {
        elem.style[computedDimension] = ''
      }, onExiting)
    }, [computedDimension, onExiting])

    return (
      <TransitionWrapper
        ref={ref}
        addEndListener={transitionEndListener}
        {...props}
        aria-expanded={props.role ? props.in : null}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
        childRef={(children as any).ref}
      >
        {(state: Exclude<TransitionStatus, 'unmounted'>, innerProps: Record<string, unknown>) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              className,
              children.props.className,
              collapseStyles[state],
              computedDimension === 'width' && 'collapse-horizontal',
            ),
          })
        }
      </TransitionWrapper>
    )
  },
)

Collapse.propTypes = propTypes as any
Collapse.defaultProps = defaultProps

export default Collapse
