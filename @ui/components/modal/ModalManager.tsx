import addClass from 'dom-helpers/addClass'
import css from 'dom-helpers/css'
import qsa from 'dom-helpers/querySelectorAll'
import removeClass from 'dom-helpers/removeClass'

import BasicModalManager, { ContainerState, ModalManagerOptions } from '@restart/ui/ModalManager'

const Selector = {
  FIXED_CONTENT: '.is-fixed',
}

class ModalManager extends BasicModalManager {
  private adjustAndStore<T extends keyof CSSStyleDeclaration>(
    prop: T,
    element: HTMLElement,
    adjust: number,
  ) {
    const actual = element.style[prop]
    // TODO: DOMStringMap and CSSStyleDeclaration aren't strictly compatible
    // @ts-ignore
    element.dataset[prop] = actual
    css(element, {
      [prop]: `${parseFloat(css(element, prop as any)) + adjust}px`,
    })
  }

  private restore<T extends keyof CSSStyleDeclaration>(prop: T, element: HTMLElement) {
    // @ts-ignore
    const value = element.dataset[prop]
    if (value !== undefined) {
      // @ts-ignore
      delete element.dataset[prop]
      css(element, { [prop]: value })
    }
  }

  setContainerStyle(containerState: ContainerState) {
    super.setContainerStyle(containerState)

    const container = this.getElement()
    addClass(container, 'modal-open')

    if (!containerState.scrollBarWidth) return

    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight'
    // const marginProp = this.isRTL ? 'marginLeft' : 'marginRight'

    qsa(container, Selector.FIXED_CONTENT).forEach((el) =>
      this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth),
    )
  }

  removeContainerStyle(containerState: ContainerState) {
    super.removeContainerStyle(containerState)

    const container = this.getElement()
    removeClass(container, 'modal-open')

    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight'
    // const marginProp = this.isRTL ? 'marginLeft' : 'marginRight'

    qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.restore(paddingProp, el))
  }
}

let sharedManager: ModalManager | undefined
export function getSharedManager(options?: ModalManagerOptions) {
  if (!sharedManager) sharedManager = new ModalManager(options)
  return sharedManager
}

export default ModalManager
