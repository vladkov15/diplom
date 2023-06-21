import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useUncontrolled } from 'uncontrollable'

import ButtonGroup, { ButtonGroupProps } from '../button/ButtonGroup'
import ToggleButton from './ToggleButton'
import Scrollable from '../Scrollable'

import { PrefixRefForwardingComponent } from '@ui/helpers'
import { map } from '@ui/utils/ElementChildren'
import chainFunction from '@ui/utils/createChainedFunction'

import styles from './Toggle.module.scss'

interface BaseToggleButtonProps
  extends Omit<ButtonGroupProps, 'toggle' | 'defaultValue' | 'onChange'> {
  scrollable?: boolean
}

export interface ToggleButtonRadioProps<T> extends BaseToggleButtonProps {
  type: 'radio' | string
  name: string
  value?: T
  defaultValue?: T
  onChange?: (value: T, event: any) => void
}

export interface ToggleButtonCheckboxProps<T> extends BaseToggleButtonProps {
  type: 'checkbox' | string
  name?: string
  value?: T[]
  defaultValue?: T[]
  onChange?: (value: T[]) => void
}

export type ToggleButtonGroupProps<T> = ToggleButtonRadioProps<T> | ToggleButtonCheckboxProps<T>

const propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  onChange: PropTypes.func,
}

const defaultProps = {
  type: 'radio',
}

const ToggleButtonGroup: PrefixRefForwardingComponent<
  'a',
  ToggleButtonGroupProps<any>
> = React.forwardRef<HTMLElement, ToggleButtonGroupProps<any>>((props, ref) => {
  const { children, className, type, name, value, scrollable, onChange, ...controlledProps } =
    useUncontrolled(props, { value: 'onChange' })

  const getValues: () => any[] = () => (value == null ? [] : [].concat(value))

  const handleToggle = (inputVal: any, event: React.MouseEvent) => {
    if (!onChange) return

    const values = getValues()
    const isActive = values.indexOf(inputVal) !== -1

    if (type === 'radio') {
      if (!isActive) onChange(inputVal, event)
      return
    }

    if (isActive) {
      onChange(
        values.filter((n) => n !== inputVal),
        event,
      )
    } else {
      onChange([...values, inputVal], event)
    }
  }

  const toggle = (
    <ButtonGroup {...controlledProps} className={classNames(className, styles['toggle'])} ref={ref}>
      {map(children, (child) => {
        const values = getValues()
        const { value: childVal, onChange: childOnChange } = child.props
        const handler = (e: React.MouseEvent) => handleToggle(childVal, e)

        return React.cloneElement(child, {
          type,
          name: child.props.name || name,
          checked: values.indexOf(childVal) !== -1,
          onChange: chainFunction(childOnChange, handler),
        })
      })}
    </ButtonGroup>
  )

  if (!scrollable) return toggle

  return <Scrollable className='pb-2'>{toggle}</Scrollable>
})

ToggleButtonGroup.propTypes = propTypes
ToggleButtonGroup.defaultProps = defaultProps

export default Object.assign(ToggleButtonGroup, { Button: ToggleButton })
