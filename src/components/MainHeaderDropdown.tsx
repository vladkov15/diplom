import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'

import Dropdown, { DropdownProps } from '@ui/components/dropdown'

import classNames from 'classnames'

import styles from './MainHeaderDropdown.module.scss'

interface MainHeaderDropdownProps extends DropdownProps {
  trigger: React.ElementType
  header?: React.ReactNode
  children: React.ReactNode
  full?: boolean
  hover?: boolean

  bodyClassName?: string
  bodyStyle?: Record<string, string | number>

  contentClassName?: string
}

const MainHeaderDropdown: FC<MainHeaderDropdownProps> = ({
  trigger,
  header,
  children,
  full = false,
  hover = false,
  bodyClassName,
  bodyStyle = {},
  contentClassName,
  className,

  ...props
}) => {
  const triggerRef = useRef<HTMLElement>()
  const [localShow, setLocalShow] = useState(props.show)

  const handleToggle = (nextShow: boolean) => setLocalShow(nextShow)
  const handleMouseEnter = () => hover && !localShow && setLocalShow(true)
  const handleMouseLeave = () => hover && localShow && setLocalShow(false)

  const internalBodyStyle = { ...bodyStyle }
  internalBodyStyle.minWidth = full ? '100%' : bodyStyle.minWidth || '320px'
  internalBodyStyle.top = -1 * (triggerRef.current?.offsetHeight || 0)

  return (
    <Dropdown
      show={localShow}
      className={classNames({
        className,
        [styles.MainHeaderDropdown]: true,
        [styles.MainHeaderDropdown__Full]: full,
      })}
      onToggle={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Dropdown.Toggle
        className={styles.MainHeaderDropdown__Trigger}
        as={trigger}
        ref={triggerRef}
      />

      <Dropdown.Menu
        className={classNames(bodyClassName, styles.MainHeaderDropdown__Body, 'p-0')}
        style={internalBodyStyle}
        popperConfig={{ strategy: 'absolute' }}
      >
        <div className={styles.MainHeaderDropdown__Header}>{!full && header}</div>
        <div className={classNames(contentClassName, styles.MainHeaderDropdown__Content)}>
          {children}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default MainHeaderDropdown
