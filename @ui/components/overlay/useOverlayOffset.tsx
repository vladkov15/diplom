import { useMemo, useRef } from 'react'
import hasClass from 'dom-helpers/hasClass'
import { Offset, Options } from '@restart/ui/usePopper'

import { usePrefix } from '@ui/components/ThemeProvider'

const POPPER_OFFSET = [0, 8]

export default function useOverlayOffset(
  customOffset?: Offset,
): [React.RefObject<HTMLElement>, Options['modifiers']] {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const popoverClass = usePrefix(undefined, 'popover')

  const offset = useMemo(
    () => ({
      name: 'offset',
      options: {
        offset: () => {
          if (overlayRef.current && hasClass(overlayRef.current, popoverClass)) {
            return customOffset || POPPER_OFFSET
          }
          return customOffset || [0, 0]
        },
      },
    }),
    [customOffset, popoverClass],
  )

  return [overlayRef, [offset]]
}
