import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePrevious } from '@restart/hooks'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from '../ThemeProvider'
import FormContext from './FormContext'
import FormLabel from './FormLabel'

import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './FormControl.module.scss'

type FormControlElement = HTMLInputElement | HTMLTextAreaElement

export interface FormControlProps
  extends PrefixProps,
    Omit<React.HTMLAttributes<FormControlElement>, 'onClick' | 'onFocus' | 'onBlur'> {
  htmlSize?: number
  size?: 'sm' | 'lg'
  plaintext?: boolean
  readOnly?: boolean
  disabled?: boolean
  value?: string | string[] | number
  type?: string
  label?: string | React.ReactElement
  isValid?: boolean
  isInvalid?: boolean
  fullscreenRef?: React.MutableRefObject<HTMLDivElement | null>

  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void

  appendInnerContent?: React.ReactNode
  prependInnerContent?: React.ReactNode
  appendOuterContent?: React.ReactNode
  prependOuterContent?: React.ReactNode
}

const propTypes = {
  prefix: PropTypes.string,
  _ref: PropTypes.any,
  size: PropTypes.string,
  htmlSize: PropTypes.number,
  as: PropTypes.elementType,
  plaintext: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,

  appendInnerContent: PropTypes.node,
  prependInnerContent: PropTypes.node,
  appendOuterContent: PropTypes.node,
  prependOuterContent: PropTypes.node,
}

const FormControl: PrefixRefForwardingComponent<'input', FormControlProps> = React.forwardRef<
  FormControlElement,
  FormControlProps
>(
  (
    {
      prefix: prefixProp,
      value,
      type,
      defaultValue,
      label,
      size,
      htmlSize,
      id,
      className,
      isValid = false,
      isInvalid = false,
      plaintext,
      readOnly,
      as: Component = 'input',
      children,
      fullscreenRef,

      onClick,

      appendInnerContent,
      prependInnerContent,
      appendOuterContent,
      prependOuterContent,

      ...props
    },
    ref,
  ) => {
    // const fullscreenRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<FormControlElement | null>(null)
    const { controlId } = useContext(FormContext)

    const [isFocused, setIsFocused] = useState(false)
    const [isTouched, setIsTouched] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const [internalValue, setInternalValue] = useState(value || defaultValue)
    const previusInternalValue = usePrevious(internalValue)

    const prefix = usePrefix(prefixProp, 'form-control')

    let classes
    if (plaintext) {
      classes = { [styles[`${prefix}--plaintext`]]: true }
    } else {
      classes = { [styles[`${prefix}--${size}`]]: size }
    }

    useEffect(() => {
      const { value: badValue } = inputRef.current as HTMLInputElement
      if (defaultValue === undefined && badValue) setInternalValue(badValue)
      if (defaultValue !== undefined) setInternalValue(defaultValue)
    }, [defaultValue])

    useEffect(() => {
      if (internalValue !== undefined && !isDirty) setIsDirty(true)
    }, [internalValue])

    useEffect(() => {
      if (isFocused && !isTouched) setIsTouched(true)
    }, [isFocused])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: newValue } = event.target

      setInternalValue(newValue)
      props.onChange?.(event)
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isFocused) inputRef.current?.focus()
      onClick?.(event)
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (!internalValue && isDirty) setIsDirty(false)
      props.onBlur?.(event)
    }

    const isEmpty = useMemo(() => {
      if (isDirty && previusInternalValue !== undefined) return false
      return !internalValue
    }, [previusInternalValue, internalValue])

    const isLabelActive = label && (!isEmpty || (isFocused && !readOnly) || props.placeholder)

    return (
      <div
        ref={fullscreenRef}
        className={classNames(
          styles[prefix],
          className,
          classes,
          label && styles[`${prefix}--label`],
          isLabelActive && styles[`${prefix}--label--active`],
          isValid && 'is-valid',
          isInvalid && 'is-invalid',
          isDirty && styles[`${prefix}--dirty`],
          isFocused && styles[`${prefix}--focus`],
          isTouched && styles[`${prefix}--touch`],
          Component === 'textarea' && styles[`${prefix}--textarea`],
        )}
        onClick={handleClick}
      >
        {prependOuterContent && (
          <div className={styles[`${prefix}-prepend-outer`]}>{prependOuterContent}</div>
        )}
        <div className={styles[`${prefix}-container`]}>
          {prependInnerContent && (
            <div className={styles[`${prefix}-prepend-inner`]}>{prependInnerContent}</div>
          )}
          <div className={styles[`${prefix}-content`]}>
            {typeof label === 'string' && !plaintext && (
              <FormLabel htmlFor={id || controlId} className={styles[`${prefix}-label`]}>
                {label}
              </FormLabel>
            )}
            <Component
              {...props}
              ref={(node: FormControlElement) => {
                inputRef.current = node
                if (typeof ref === 'function') ref(node)
                else if (ref) ref.current = node
              }}
              id={id || controlId}
              className={classNames(styles[`${prefix}-element`])}
              type={type}
              size={htmlSize}
              readOnly={readOnly}
              // value={value}
              defaultValue={internalValue}
              onInput={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          {appendInnerContent && (
            <div className={styles[`${prefix}-append-inner`]}>{appendInnerContent}</div>
          )}
        </div>
        {appendOuterContent && (
          <div className={styles[`${prefix}-append-outer`]}>{appendOuterContent}</div>
        )}
      </div>
    )
  },
)

FormControl.displayName = 'FormControl'
FormControl.propTypes = propTypes

export default Object.assign(FormControl)
