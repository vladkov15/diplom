import React from 'react'
import classNames from 'classnames'
import camelize from 'dom-helpers/camelize'

import { usePrefix } from '../components/ThemeProvider'
import { PrefixRefForwardingComponent } from '../helpers'

const pascalCase = (str: string) => str[0].toUpperCase() + camelize(str).slice(1)

interface PrefixOptions<As extends React.ElementType = 'div'> {
  displayName?: string
  Component?: As
  className?: string
  defaultProps?: Partial<React.ComponentProps<As>>
}

export default function createWithPrefix<As extends React.ElementType = 'div'>(
  prefix: string,
  {
    displayName = pascalCase(prefix),
    Component: ComponentProp,
    className: classNameProp,
    defaultProps,
  }: PrefixOptions<As> = {},
): PrefixRefForwardingComponent<As> {
  const Component = React.forwardRef(
    ({ className, prefix: prefixProp, as: Tag = ComponentProp || 'div', ...props }: any, ref) => {
      const resolvedPrefix = usePrefix(prefixProp, prefix)
      return (
        <Tag
          ref={ref}
          className={classNames(className, classNameProp, resolvedPrefix)}
          {...props}
        />
      )
    },
  )

  Component.defaultProps = defaultProps
  Component.displayName = displayName

  return Component
}
