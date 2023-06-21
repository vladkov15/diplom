import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Feedback, { FeedbackType } from './Feedback'
import FormCheckInput from './FormCheckInput'
import FormCheckLabel from './FormCheckLabel'
import FormContext from './FormContext'

import { usePrefix } from '../ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'
import { hasChildOfType } from '@ui/utils/ElementChildren'

import styles from './FormCheck.module.scss'

export type FormCheckType = 'checkbox' | 'radio' | 'switch'

export interface FormCheckProps extends PrefixProps, React.InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean
  reverse?: boolean
  disabled?: boolean
  label?: React.ReactNode
  classNameLabel?: string
  type?: FormCheckType
  isValid?: boolean
  isInvalid?: boolean
  feedbackTooltip?: boolean
  feedback?: React.ReactNode
  feedbackType?: FeedbackType
  switchPrefix?: string
}

const propTypes = {
  _ref: PropTypes.any,
  prefix: PropTypes.string,
  switchPrefix: PropTypes.string,
  id: PropTypes.string,
  as: PropTypes.elementType,
  children: PropTypes.node,
  inline: PropTypes.bool,
  reverse: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  label: PropTypes.node,
  type: PropTypes.oneOf(['radio', 'checkbox', 'switch']),
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  feedbackTooltip: PropTypes.bool,
  feedback: PropTypes.node,
}

const FormCheck: PrefixRefForwardingComponent<'input', FormCheckProps> = React.forwardRef<
  HTMLInputElement,
  FormCheckProps
>(
  (
    {
      id,
      prefix: prefixProp,
      switchPrefix: switchPrefixProp,
      inline = false,
      reverse = false,
      disabled = false,
      isValid = false,
      isInvalid = false,
      feedbackTooltip = false,
      feedback,
      feedbackType,
      className,
      style,
      title = '',
      type = 'checkbox',
      label,
      classNameLabel,
      children,
      as = 'input',
      ...props
    },
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'form-check')
    const switchPrefix = usePrefix(switchPrefixProp, 'form-switch')

    const { controlId } = useContext(FormContext)
    const innerFormContext = useMemo(() => ({ controlId: id || controlId }), [controlId, id])

    const hasLabel =
      (!children && label != null && label !== false) || hasChildOfType(children, FormCheckLabel)

    const input = (
      <FormCheckInput
        {...props}
        type={type === 'switch' ? 'checkbox' : type}
        ref={ref}
        isValid={isValid}
        isInvalid={isInvalid}
        disabled={disabled}
        as={as}
      />
    )

    return (
      <FormContext.Provider value={innerFormContext}>
        <div
          style={style}
          className={classNames(
            className,
            hasLabel && styles[prefix],
            inline && styles[`${prefix}--inline`],
            reverse && styles[`${prefix}--reverse`],
            type === 'switch' && styles[switchPrefix],
          )}
        >
          {children || (
            <>
              {input}
              {hasLabel && (
                <FormCheckLabel className={classNameLabel} title={title}>
                  {label}
                </FormCheckLabel>
              )}
              {feedback && (
                <Feedback type={feedbackType} tooltip={feedbackTooltip}>
                  {feedback}
                </Feedback>
              )}
            </>
          )}
        </div>
      </FormContext.Provider>
    )
  },
)

FormCheck.displayName = 'FormCheck'
FormCheck.propTypes = propTypes

export default Object.assign(FormCheck, {
  Input: FormCheckInput,
  Label: FormCheckLabel,
})
