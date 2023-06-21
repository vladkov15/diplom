import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from '../ThemeProvider'
import FormContext from './FormContext'

import { PrefixProps } from '@ui/helpers'

import styles from './FormCheck.module.scss'

export interface FormCheckLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    PrefixProps {}

const propTypes = {
  prefix: PropTypes.string,
  htmlFor: PropTypes.string,
}

const FormCheckLabel = React.forwardRef<HTMLLabelElement, FormCheckLabelProps>(
  ({ prefix: prefixProp, className, htmlFor, ...props }, ref) => {
    const { controlId } = useContext(FormContext)

    const prefix = usePrefix(prefixProp, 'form-check-label')

    return (
      <label
        {...props}
        ref={ref}
        htmlFor={htmlFor || controlId}
        className={classNames(className, styles[prefix])}
      />
    )
  },
)

FormCheckLabel.displayName = 'FormCheckLabel'
FormCheckLabel.propTypes = propTypes

export default FormCheckLabel
