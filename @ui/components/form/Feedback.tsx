import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { AsProp, PrefixRefForwardingComponent } from '@ui/helpers'

export type FeedbackType = 'valid' | 'invalid'

export interface FeedbackProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  prefix?: never
  type?: FeedbackType
  tooltip?: boolean
}

const propTypes = {
  type: PropTypes.string,
  tooltip: PropTypes.bool,
  as: PropTypes.elementType,
}

const Feedback: PrefixRefForwardingComponent<'div', FeedbackProps> = React.forwardRef(
  ({ as: Component = 'div', className, type = 'valid', tooltip = false, ...props }, ref) => (
    <Component
      {...props}
      ref={ref}
      className={classNames(className, `${type}-${tooltip ? 'tooltip' : 'feedback'}`)}
    />
  ),
)

Feedback.displayName = 'Feedback'
Feedback.propTypes = propTypes

export default Feedback
