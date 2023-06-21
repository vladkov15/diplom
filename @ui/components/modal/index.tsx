import React, { useCallback, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import addEventListener from 'dom-helpers/addEventListener'
import canUseDOM from 'dom-helpers/canUseDOM'
import ownerDocument from 'dom-helpers/ownerDocument'
import removeEventListener from 'dom-helpers/removeEventListener'
import getScrollbarSize from 'dom-helpers/scrollbarSize'
import transitionEnd from 'dom-helpers/transitionEnd'
import useCallbackRef from '@restart/hooks/useCallbackRef'
import useEventCallback from '@restart/hooks/useEventCallback'
import useMergedRefs from '@restart/hooks/useMergedRefs'
import useWillUnmount from '@restart/hooks/useWillUnmount'

import { usePrefix, useIsRTL } from '../ThemeProvider'
import BaseModal, { BaseModalProps } from '@restart/ui/Modal'
import { ModalInstance } from '@restart/ui/ModalManager'
import { getSharedManager } from './ModalManager'
import Fade from '../Fade'
import ModalBody from './ModalBody'
import ModalContext from './ModalContext'
import ModalDialog from './ModalDialog'
import ModalFooter from './ModalFooter'
import ModalHeader from './ModalHeader'
import ModalTitle from './ModalTitle'

import { PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './Modal.module.scss'
import CloseButton from '../button/ButtonClose'
import ModalButtonClose from './ModalButtonClose'

export interface ModalProps
  extends Omit<
    BaseModalProps,
    'role' | 'renderBackdrop' | 'renderDialog' | 'transition' | 'backdropTransition' | 'children'
  > {
  size?: 'sm' | 'lg' | 'xl'
  fullscreen?: true | string | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down'
  prefix?: string
  centered?: boolean
  backdropClassName?: string
  animation?: boolean
  dialogClassName?: string
  contentClassName?: string
  dialogAs?: React.ElementType
  scrollable?: boolean
  closeButton?: boolean
  [other: string]: any
}

const propTypes = {
  prefix: PropTypes.string,
  size: PropTypes.string,
  fullscreen: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  centered: PropTypes.bool,
  backdrop: PropTypes.oneOf(['static', true, false]),
  backdropClassName: PropTypes.string,
  keyboard: PropTypes.bool,
  scrollable: PropTypes.bool,
  closeButton: PropTypes.bool,
  animation: PropTypes.bool,
  dialogClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  dialogAs: PropTypes.elementType,
  autoFocus: PropTypes.bool,
  enforceFocus: PropTypes.bool,
  restoreFocus: PropTypes.bool,
  restoreFocusOptions: PropTypes.shape({ preventScroll: PropTypes.bool }),
  show: PropTypes.bool,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  onEscapeKeyDown: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  manager: PropTypes.object,
  container: PropTypes.any,
  'aria-labelledby': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-label': PropTypes.string,
}

const defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: ModalDialog,
}

function DialogTransition(props: any) {
  return <Fade {...props} timeout={null} />
}

function BackdropTransition(props: any) {
  return <Fade {...props} timeout={null} />
}

const Modal: PrefixRefForwardingComponent<'div', ModalProps> = React.forwardRef(
  (
    {
      prefix: prefixProp,
      className,
      style,
      dialogClassName,
      contentClassName,
      children,
      dialogAs: Dialog,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,

      /* BaseModal props */
      show,
      animation,
      backdrop,
      closeButton,
      keyboard,
      onEscapeKeyDown,
      onShow,
      onHide,
      container,
      autoFocus,
      enforceFocus,
      restoreFocus,
      restoreFocusOptions,
      onEntered,
      onExit,
      onExiting,
      onEnter,
      onEntering,
      onExited,
      backdropClassName,
      manager: propsManager,
      ...props
    },
    ref,
  ) => {
    const [modalStyle, setStyle] = useState({})
    const [animateStaticModal, setAnimateStaticModal] = useState(false)
    const waitingForMouseUpRef = useRef(false)
    const ignoreBackdropClickRef = useRef(false)
    const removeStaticModalAnimationRef = useRef<(() => void) | null>(null)
    const [modal, setModalRef] = useCallbackRef<ModalInstance>()
    const mergedRef = useMergedRefs(ref, setModalRef as any)
    const handleHide = useEventCallback(onHide)
    const isRTL = useIsRTL()

    const prefix = usePrefix(prefixProp, 'modal')

    const modalContext = useMemo(() => ({ onHide: handleHide }), [handleHide])

    function getModalManager() {
      if (propsManager) return propsManager
      return getSharedManager({ isRTL })
    }

    function updateDialogStyle(node: Element) {
      if (!canUseDOM) return

      const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0

      const modalIsOverflowing =
        node.scrollHeight > ownerDocument(node).documentElement.clientHeight

      setStyle({
        paddingRight:
          containerIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : undefined,
        paddingLeft: !containerIsOverflowing && modalIsOverflowing ? getScrollbarSize() : undefined,
      })
    }

    const handleWindowResize = useEventCallback(() => {
      if (modal) updateDialogStyle(modal.dialog)
    })

    useWillUnmount(() => {
      removeEventListener(window as any, 'resize', handleWindowResize)
      removeStaticModalAnimationRef.current?.()
    })

    const handleDialogMouseDown = () => {
      waitingForMouseUpRef.current = true
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
        ignoreBackdropClickRef.current = true
      }
      waitingForMouseUpRef.current = false
    }

    const handleStaticModalAnimation = () => {
      setAnimateStaticModal(true)
      removeStaticModalAnimationRef.current = transitionEnd(modal!.dialog as any, () => {
        setAnimateStaticModal(false)
      })
    }

    const handleStaticBackdropClick = (e: MouseEvent) => {
      if (e.target !== e.currentTarget) return

      handleStaticModalAnimation()
    }

    const handleClick = (e: MouseEvent) => {
      if (backdrop === 'static') {
        handleStaticBackdropClick(e)
        return
      }

      if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
        ignoreBackdropClickRef.current = false
        return
      }

      onHide?.()
    }

    const handleEscapeKeyDown = (e: KeyboardEvent) => {
      if (keyboard) {
        onEscapeKeyDown?.(e)
      } else {
        // Call preventDefault to stop modal from closing in @restart/ui.
        e.preventDefault()

        if (backdrop === 'static') {
          // Play static modal animation.
          handleStaticModalAnimation()
        }
      }
    }

    const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
      if (node) updateDialogStyle(node)

      onEnter?.(node, isAppearing)
    }

    const handleExit = (node: HTMLElement) => {
      removeStaticModalAnimationRef.current?.()
      onExit?.(node)
    }

    const handleEntering = (node: HTMLElement, isAppearing: boolean) => {
      onEntering?.(node, isAppearing)

      // FIXME: This should work even when animation is disabled.
      addEventListener(window as any, 'resize', handleWindowResize)
    }

    const handleExited = (node: HTMLElement) => {
      if (node) node.style.display = '' // RHL removes it sometimes
      onExited?.(node)

      // FIXME: This should work even when animation is disabled.
      removeEventListener(window as any, 'resize', handleWindowResize)
    }

    const renderBackdrop = useCallback(
      (backdropProps: any) => (
        <div
          {...backdropProps}
          className={classNames(
            styles[`${prefix}-backdrop`],
            backdropClassName,
            !animation && 'show',
          )}
        />
      ),
      [animation, backdropClassName, prefix],
    )

    const baseModalStyle = { ...style, ...modalStyle }

    baseModalStyle.display = 'block'

    const renderDialog = (dialogProps: any) => (
      <div
        role='dialog'
        {...dialogProps}
        style={baseModalStyle}
        className={classNames(
          className,
          styles[prefix],
          animateStaticModal && styles[`${prefix}--static`],
          !animation && 'show',
        )}
        onClick={backdrop ? handleClick : undefined}
        onMouseUp={handleMouseUp}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      >
        <ModalDialog
          {...props}
          onMouseDown={handleDialogMouseDown}
          className={dialogClassName}
          contentClassName={contentClassName}
        >
          {children}
        </ModalDialog>

        {closeButton && (
          <ModalButtonClose className={styles[`${prefix}__button-close`]} closeVariant='white' />
        )}
      </div>
    )

    return (
      <ModalContext.Provider value={modalContext}>
        <BaseModal
          show={show}
          ref={mergedRef}
          backdrop={backdrop}
          container={container}
          keyboard // Always set true - see handleEscapeKeyDown
          autoFocus={autoFocus}
          enforceFocus={enforceFocus}
          restoreFocus={restoreFocus}
          restoreFocusOptions={restoreFocusOptions}
          onEscapeKeyDown={handleEscapeKeyDown}
          onShow={onShow}
          onHide={onHide}
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={onEntered}
          onExit={handleExit}
          onExiting={onExiting}
          onExited={handleExited}
          manager={getModalManager()}
          transition={animation ? DialogTransition : undefined}
          backdropTransition={animation ? BackdropTransition : undefined}
          renderBackdrop={renderBackdrop}
          renderDialog={renderDialog}
        />
      </ModalContext.Provider>
    )
  },
)

Modal.displayName = 'Modal'
Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Object.assign(Modal, {
  Body: ModalBody,
  Header: ModalHeader,
  Title: ModalTitle,
  Footer: ModalFooter,
  Dialog: ModalDialog,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150,
})
