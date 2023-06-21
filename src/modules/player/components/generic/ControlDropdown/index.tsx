import React, { FC, useRef, useState } from 'react'
import classNames from 'classnames'

import Dropdown, { DropdownProps } from '@ui/components/dropdown'

import styles from './ControlDropdown.module.scss'

interface ControlDropdownProps extends DropdownProps {
  trigger: React.ElementType
  children: React.ReactNode
  hover?: boolean
  bodyStyle?: Record<string, string | number>
}

const ControlDropdown: FC<ControlDropdownProps> = ({
  trigger,
  className,
  bodyStyle = {},
  hover = true,
  children,
}) => {
  const triggerRef = useRef<HTMLElement>()

  const [show, setShow] = useState<boolean>(false)
  const handleToggle = (nextShow: boolean) => setShow(nextShow)

  const handleMouseEnter = () => hover && !show && setShow(true)
  const handleMouseLeave = () => hover && show && setShow(false)

  const internalBodyStyle = { ...bodyStyle }
  internalBodyStyle.minWidth = bodyStyle.minWidth || '140px'
  internalBodyStyle.bottom = -1 * (triggerRef.current?.offsetHeight || 0)

  return (
    <Dropdown
      className={classNames(className, styles.Dropdown)}
      show={show}
      onToggle={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Dropdown.Toggle as={trigger} ref={triggerRef} className={styles.Dropdown__Toggle} />

      <Dropdown.Menu className={styles.Dropdown__Body} style={internalBodyStyle}>
        <div className={styles.Dropdown__Content}>{children}</div>
        <div
          style={{ height: `${-1 * internalBodyStyle.bottom}px` }}
          className={styles.Dropdown__Footer}
        />
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ControlDropdown
