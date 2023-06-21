import React from 'react'
import classNames from 'classnames'

export default (className: string) => {
  return React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>((props, ref) => (
    <div {...props} ref={ref} className={classNames(props.className, className)} />
  ))
}
