import React, { FC } from 'react'

import { usePrefix } from './ThemeProvider'

import styles from './Scrollable.module.scss'
import classNames from 'classnames'

interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
  prefix?: string
  children: React.ReactNode
}

const Scrollable: FC<ScrollableProps> = React.forwardRef<HTMLDivElement, ScrollableProps>(
  ({ prefix: prefixProp, className, children, ...props }, ref) => {
    const prefix = usePrefix(prefixProp, 'scrollable')

    return (
      <div ref={ref} className={classNames(className, styles[prefix])} {...props}>
        {children}
      </div>
    )
  },
)

export default Scrollable
