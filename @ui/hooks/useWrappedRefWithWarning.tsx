import { useCallback } from 'react'
import warning from 'warning'
import useMergedRefs from '@restart/hooks/useMergedRefs'

export default function useWrappedRefWithWarning(ref: any, componentName: string) {
  if (process.env.NODE_ENV !== 'development') return ref

  const warningRef = useCallback(
    (refValue: any) => {
      warning(
        refValue == null || !refValue.isReactComponent,
        `${componentName} injected a ref to a provided \`as\` component that resolved to a component instance instead of a DOM element. ` +
          'Use `React.forwardRef` to provide the injected ref to the class component as a prop in order to pass it directly to a DOM element',
      )
    },
    [componentName],
  )

  return useMergedRefs(warningRef, ref)
}
