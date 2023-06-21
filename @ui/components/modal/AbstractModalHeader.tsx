import React from 'react'
import PropTypes from 'prop-types'

import { ButtonCloseVariant } from '../button/ButtonClose'
import ModalButtonClose from './ModalButtonClose'

export interface AbstractModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  closeLabel?: string
  closeVariant?: ButtonCloseVariant
  closeButton?: boolean
  onHide?: () => void
}

const propTypes = {
  closeLabel: PropTypes.string,
  closeVariant: PropTypes.oneOf<ButtonCloseVariant>(['white']),
  closeButton: PropTypes.bool,
  onHide: PropTypes.func,
}

const defaultProps = {
  closeLabel: 'Close',
  closeButton: false,
}

const AbstractModalHeader = React.forwardRef<HTMLDivElement, AbstractModalHeaderProps>(
  ({ closeLabel, closeVariant, closeButton, onHide, children, ...props }, ref) => {
    const modalButtonCloseProps = { closeLabel, closeVariant, onHide }

    return (
      <div ref={ref} {...props}>
        {children}

        {closeButton && <ModalButtonClose {...modalButtonCloseProps} />}
      </div>
    )
  },
)

AbstractModalHeader.propTypes = propTypes
AbstractModalHeader.defaultProps = defaultProps

export default AbstractModalHeader
