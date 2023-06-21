import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PrefixRefForwardingComponent, AsProp } from '@ui/helpers'

import {
  convertChangeEventToValues,
  convertFormEventToValues,
  IFormReturnValue,
} from '@ui/components/form/utils'

import FormGroup from './FormGroup'
import FormLabel from './FormLabel'
import FormControl from './FormControl'
import FormSelect from './FormSelect'
import FormCheck from './FormCheck'
import FormDropdownSelect from './FormDropdownSelect'
import Feedback from './Feedback'

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement>, AsProp {
  validated?: boolean
  onFinish?: (value: IFormReturnValue) => void
  onHandleChange?: (value: IFormReturnValue) => void
}

const propTypes = {
  _ref: PropTypes.any,
  validated: PropTypes.bool,
  onFinish: PropTypes.func,
  onHandleChange: PropTypes.func,
  as: PropTypes.elementType,
}

const Form: PrefixRefForwardingComponent<'form', FormProps> = React.forwardRef<
  HTMLFormElement,
  FormProps
>(
  (
    {
      className,
      validated,
      onFinish,
      onHandleChange,
      onSubmit,
      onChange,
      as: Component = 'form',
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        {...props}
        ref={ref}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          onSubmit?.(e)
          onFinish?.(convertFormEventToValues(e))
        }}
        onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
          onChange?.(e)
          onHandleChange?.(convertChangeEventToValues(e))
        }}
        className={classNames(className, validated && 'was-validated')}
      />
    )
  },
)

Form.displayName = 'Form'
Form.propTypes = propTypes

export default Object.assign(Form, {
  Group: FormGroup,
  Label: FormLabel,
  Select: FormSelect,
  DropdownSelect: FormDropdownSelect,
  FormControl: FormControl,
  Checkbox: FormCheck,
  Feedback: Feedback,
})
