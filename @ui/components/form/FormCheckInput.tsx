import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import FormContext from './FormContext'
import { usePrefix } from '../ThemeProvider'

import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './FormCheck.module.scss'

type FormCheckInputType = 'checkbox' | 'radio'

export interface FormCheckInputProps
  extends PrefixProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  type?: FormCheckInputType
  isValid?: boolean
  isInvalid?: boolean
}

const propTypes = {
  prefix: PropTypes.string,
  as: PropTypes.elementType,
  id: PropTypes.string,
  type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
}

const FormCheckInput: PrefixRefForwardingComponent<'input', FormCheckInputProps> = React.forwardRef<
  HTMLInputElement,
  FormCheckInputProps
>(
  (
    {
      id,
      prefix: prefixProp,
      className,
      type = 'checkbox',
      isValid = false,
      isInvalid = false,
      as: Component = 'input',
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext)
    const prefix = usePrefix(prefixProp, 'form-check-input')

    return (
      <Component
        {...props}
        ref={ref}
        type={type}
        id={id || controlId}
        className={classNames(
          className,
          styles[prefix],
          isValid && 'is-valid',
          isInvalid && 'is-invalid',
        )}
      />
    )
  },
)

FormCheckInput.displayName = 'FormCheckInput'
FormCheckInput.propTypes = propTypes

export default FormCheckInput
