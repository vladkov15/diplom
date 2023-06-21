import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PrefixOnlyProps, PrefixRefForwardingComponent } from '@ui/helpers'

import { usePrefix } from '../ThemeProvider'
import FormContext from './FormContext'

import styles from './FormSelect.module.scss'

export interface FormSelectProps
  extends PrefixOnlyProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  htmlSize?: number
  size?: 'sm' | 'lg'
  isValid?: boolean
  isInvalid?: boolean
}

const propTypes = {
  prefix: PropTypes.string,
  size: PropTypes.string,
  htmlSize: PropTypes.number,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
}

const FormSelect: PrefixRefForwardingComponent<'select', FormSelectProps> = React.forwardRef<
  HTMLSelectElement,
  FormSelectProps
>(
  (
    {
      prefix: prefixProp,
      size,
      htmlSize,
      className,
      isValid = false,
      isInvalid = false,
      id,
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext)
    const prefix = usePrefix(prefixProp, 'form-select')

    return (
      <select
        {...props}
        size={htmlSize}
        ref={ref}
        className={classNames(
          className,
          styles[prefix],
          size && styles[`${prefix}-${size}`],
          isValid && styles[`is-valid`],
          isInvalid && styles[`is-invalid`],
        )}
        id={id || controlId}
      />
    )
  },
)

FormSelect.displayName = 'FormSelect'
FormSelect.propTypes = propTypes

export default FormSelect
