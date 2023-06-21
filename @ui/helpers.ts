import * as React from 'react'
import { TransitionComponent } from '@restart/ui/types'

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
  React.ComponentPropsWithRef<Inner>,
  P
> &
  P

export interface PrefixOnlyProps {
  prefix?: string
}

export interface AsProp<As extends React.ElementType = React.ElementType> {
  as?: As
}

export interface PrefixProps<As extends React.ElementType = React.ElementType>
  extends PrefixOnlyProps,
    AsProp<As> {}

export interface PrefixRefForwardingComponent<TInitial extends React.ElementType, P = unknown> {
  <As extends React.ElementType = TInitial>(
    props: React.PropsWithChildren<ReplaceProps<As, PrefixProps<As> & P>>,
    context?: any,
  ): React.ReactElement | null

  propTypes?: any
  contextTypes?: any
  defaultProps?: Partial<P>
  displayName?: string
}

export class PrefixComponent<As extends React.ElementType, P = unknown> extends React.Component<
  ReplaceProps<As, PrefixProps<As> & P>
> {}

export type PrefixComponentClass<As extends React.ElementType, P = unknown> = React.ComponentClass<
  ReplaceProps<As, PrefixProps<As> & P>
>

export type TransitionType = boolean | TransitionComponent

export function getOverlayDirection(placement: string) {
  let direction = placement
  if (placement === 'left') direction = 'start'
  else if (placement === 'right') direction = 'end'
  return direction
}
