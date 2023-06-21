import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PrefixOnlyProps, PrefixRefForwardingComponent } from '@ui/helpers'

import { usePrefix } from '../ThemeProvider'
import FormContext from './FormContext'

import FormControl, { FormControlProps } from './FormControl'
import Dropdown from '../dropdown'
import { map } from '@ui/utils/ElementChildren'

import styles from './FormDropdownSelect.module.scss'
import Button from '../button'
import Scrollable from '../Scrollable'

export interface ISelectItem {
  value: ValueType<any>
  label: string
}

interface FormControlToggleProps extends FormControlProps {
  active?: boolean
}

const FormControlToggle = React.forwardRef<HTMLInputElement, FormControlToggleProps>(
  ({ children, onClick, active, prefix, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      onClick?.(e)
    }

    return (
      <FormControl
        {...props}
        fullscreenRef={ref}
        onClick={handleClick}
        appendInnerContent={
          <div className={styles[`${prefix}-actions`]}>
            <Button
              style={{ transform: active ? 'rotate(180deg)' : 'none' }}
              className={styles[`${prefix}-actions__caret`]}
              variant='link'
              size='sm'
              icon
            >
              <i className='icon-arrow-down' />
            </Button>
          </div>
        }
        readOnly
      >
        {children}
      </FormControl>
    )
  },
)

export interface FormSelectProps
  extends PrefixOnlyProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
  value: ValueType<any>
  htmlSize?: number
  size?: 'sm' | 'lg'
  label?: string
  isValid?: boolean
  isInvalid?: boolean
  onChange?: (item: ISelectItem, name?: string) => void
}

const propTypes = {
  prefix: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
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

const FormDropdownSelect: PrefixRefForwardingComponent<'select', FormSelectProps> =
  React.forwardRef<HTMLDivElement, FormSelectProps>(
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
      const prefix = usePrefix(prefixProp, 'form-dropdown-select')

      const [item, setItem] = useState<ISelectItem | null>(null)
      const [items, setItems] = useState<ISelectItem[]>([])
      const [active, setActive] = useState(false)

      useEffect(() => {
        const newItems = map(props.children, (child) => ({
          value: child.props.value,
          label: child.props.children,
        })) as ISelectItem[]
        setItems(newItems)

        if (props.value) {
          const newItem = newItems.find(({ value }) => props.value === value)
          newItem && setItem(newItem)
        }
      }, [])

      const handleToggle = (nextShow: boolean) => setActive(nextShow)

      const handleClickItem = (item: ISelectItem) => {
        setItem(item)
        props.onChange?.(item, props.name)
      }

      return (
        <Dropdown
          ref={ref}
          id={id || controlId}
          className={classNames(
            className,
            styles[prefix],
            size && styles[`${prefix}-${size}`],
            isValid && styles[`is-valid`],
            isInvalid && styles[`is-invalid`],
          )}
          onToggle={handleToggle}
          drop='down-centered'
        >
          <Dropdown.Toggle
            as={FormControlToggle}
            name={props.name}
            className={styles[`${prefix}-toggle`]}
            defaultValue={item?.label}
            label={props.label}
            active={active}
            childPrefix={prefix}
          />

          <Dropdown.Menu
            className={classNames(className, styles[`${prefix}-menu`])}
            popperConfig={{ strategy: 'absolute' }}
            style={{ width: '100%', borderRadius: '10px', top: '10px' }}
          >
            <Scrollable style={{ maxHeight: 320 }}>
              {items.map(({ value, label }, index) => (
                <Dropdown.Item
                  className={classNames(className, styles[`${prefix}-menu-item`])}
                  eventKey={value}
                  onClick={() => handleClickItem({ value, label })}
                  active={item?.value === value}
                  key={index}
                >
                  {label}
                </Dropdown.Item>
              ))}
            </Scrollable>
          </Dropdown.Menu>
        </Dropdown>
      )
    },
  )

FormDropdownSelect.displayName = 'FormDropdownSelect'
FormDropdownSelect.propTypes = propTypes

export default FormDropdownSelect
