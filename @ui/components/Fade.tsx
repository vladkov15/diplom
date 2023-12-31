import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Transition, { TransitionStatus, ENTERED, ENTERING } from 'react-transition-group/Transition'
import { TransitionCallbacks } from '@restart/ui/types'

import transitionEndListener from '../utils/transitionEndListener'
import triggerBrowserReflow from '../utils/triggerBrowserReflow'

import TransitionWrapper from './TransitionWrapper'

export interface FadeProps extends TransitionCallbacks {
  className?: string
  in?: boolean
  mountOnEnter?: boolean
  unmountOnExit?: boolean
  appear?: boolean
  timeout?: number
  children: React.ReactElement
  transitionClasses?: Record<string, string>
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
  children: PropTypes.element.isRequired,
  transitionClasses: PropTypes.object,
}

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
}

const fadeStyles = {
  [ENTERING]: 'show',
  [ENTERED]: 'show',
}

const Fade = React.forwardRef<Transition<any>, FadeProps>(
  ({ className, children, transitionClasses = {}, ...props }, ref) => {
    const handleEnter = useCallback(
      (node: HTMLElement, isAppearing: boolean) => {
        triggerBrowserReflow(node)
        props.onEnter?.(node, isAppearing)
      },
      [props],
    )

    return (
      <TransitionWrapper
        ref={ref}
        addEndListener={transitionEndListener}
        {...props}
        onEnter={handleEnter}
        childRef={(children as any).ref}
      >
        {(
          status: Exclude<TransitionStatus, 'exiting' | 'exited' | 'unmounted'>,
          innerProps: Record<string, unknown>,
        ) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              className,
              'fade',
              children.props.className,
              fadeStyles[status],
              transitionClasses[status],
            ),
          })
        }
      </TransitionWrapper>
    )
  },
)

Fade.propTypes = propTypes as any
Fade.defaultProps = defaultProps
Fade.displayName = 'Fade'

export default Fade
