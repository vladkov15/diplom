import React from 'react'

function map<P = any>(
  children: React.ReactNode,
  func: (el: React.ReactElement<P>, index: number) => any,
) {
  let index = 0
  return React.Children.map(children, (child) =>
    React.isValidElement<P>(child) ? func(child, index++) : child,
  )
}

function forEach<P = any>(
  children: React.ReactNode,
  func: (el: React.ReactElement<P>, index: number) => void,
) {
  let index = 0
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<P>(child)) func(child, index++)
  })
}

function hasChildOfType<P = any>(
  children: React.ReactNode,
  type: string | React.JSXElementConstructor<P>,
): boolean {
  return React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === type,
  )
}

export { map, forEach, hasChildOfType }
