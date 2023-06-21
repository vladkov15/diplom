import React, { useContext } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import FormContext from './FormContext'
import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

export interface FormLabelProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  htmlFor?: string
  visuallyHidden?: boolean
}

const propTypes = {
  prefix: PropTypes.string,
  htmlFor: PropTypes.string,
  _ref: PropTypes.any,
  visuallyHidden: PropTypes.bool,
  as: PropTypes.elementType,
}

const defaultProps = {
  visuallyHidden: false,
}

const FormLabel: PrefixRefForwardingComponent<'label', FormLabelProps> = React.forwardRef<
  HTMLElement,
  FormLabelProps
>(
  (
    {
      as: Component = 'label',
      prefix: prefixProp,
      visuallyHidden,
      className,
      htmlFor: htmlForProp,
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext)

    const prefix = usePrefix(prefixProp, 'form-label')

    const classes = classNames(className, prefix, visuallyHidden && 'visually-hidden')

    const htmlFor = htmlForProp || controlId

    return <Component ref={ref} className={classes} htmlFor={htmlFor} {...props} />
  },
)

FormLabel.displayName = 'FormLabel'
FormLabel.propTypes = propTypes
FormLabel.defaultProps = defaultProps

export default FormLabel
