import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ReactPortalProps {
  wrapperId: string
  children: React.ReactNode
}

const ReactPortal: FC<ReactPortalProps> = ({ wrapperId = 'react-portal-wrapper', children }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let element = document.getElementById(wrapperId)
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

export default ReactPortal
