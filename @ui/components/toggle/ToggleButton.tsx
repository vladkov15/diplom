import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button, { ButtonProps } from '../button'

import { usePrefix } from '@ui/components/ThemeProvider'

import styles from './Toggle.module.scss'

export type ToggleButtonType = 'checkbox' | 'radio'

export interface ToggleButtonProps extends Omit<ButtonProps, 'onChange' | 'type'> {
  type?: ToggleButtonType
  name?: string
  checked?: boolean
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value: string | ReadonlyArray<string> | number
  inputRef?: React.Ref<HTMLInputElement>
}

const noop = () => undefined

const propTypes = {
  prefix: PropTypes.string,
  type: PropTypes.oneOf<ToggleButtonType>(['checkbox', 'radio']),
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
    PropTypes.number,
  ]).isRequired,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
}

const ToggleButton = React.forwardRef<HTMLLabelElement, ToggleButtonProps>(
  (
    {
      prefix: prefixProp,
      name,
      className,
      checked,
      type,
      onChange,
      value,
      disabled,
      id,
      inputRef,
      ...props
    },
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'toggle-button')

    return (
      <>
        <input
          className={styles[`${prefix}-input`]}
          name={name}
          type={type}
          value={value}
          ref={inputRef}
          autoComplete='off'
          checked={!!checked}
          disabled={!!disabled}
          onChange={onChange || noop}
          id={id}
        />
        <Button
          {...props}
          ref={ref}
          className={classNames(
            className,
            styles[prefix],
            disabled && styles[`${prefix}--disabled`],
          )}
          type={undefined}
          role={undefined}
          as='label'
          htmlFor={id}
          variant='link'
        />
      </>
    )
  },
)

ToggleButton.propTypes = propTypes
ToggleButton.displayName = 'ToggleButton'

export default ToggleButton
