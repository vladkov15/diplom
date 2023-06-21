import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import useEventCallback from '@restart/hooks/useEventCallback'

import ButtonClose, { ButtonCloseProps, ButtonCloseVariant } from '../button/ButtonClose'
import ModalContext from './ModalContext'

export interface ModalButtonCloseProps extends ButtonCloseProps {
  closeLabel?: string
  closeVariant?: ButtonCloseVariant
  onHide?: () => void
}

const propTypes = {
  closeLabel: PropTypes.string,
  closeVariant: PropTypes.oneOf<ButtonCloseVariant>(['white']),
  onHide: PropTypes.func,
}

const defaultProps = {
  closeLabel: 'Close',
}

const ModalButtonClose = React.forwardRef<HTMLButtonElement, ModalButtonCloseProps>(
  ({ closeLabel, closeVariant, onHide, children, ...props }, ref) => {
    const context = useContext(ModalContext)

    const handleClick = useEventCallback(() => {
      context?.onHide()
      onHide?.()
    })

    return (
      <ButtonClose
        ref={ref}
        {...props}
        aria-label={closeLabel}
        variant={closeVariant}
        onClick={handleClick}
      />
    )
  },
)

ModalButtonClose.propTypes = propTypes
ModalButtonClose.defaultProps = defaultProps

export default ModalButtonClose
