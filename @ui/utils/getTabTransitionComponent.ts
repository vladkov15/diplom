import { TransitionComponent } from '@restart/ui/types'
import NoopTransition from '@restart/ui/NoopTransition'

import Fade from '../components/Fade'

import { TransitionType } from '@ui/helpers'

export default function getTabTransitionComponent(
  transition?: TransitionType,
): TransitionComponent | undefined {
  if (typeof transition === 'boolean') {
    return transition ? Fade : NoopTransition
  }

  return transition
}
