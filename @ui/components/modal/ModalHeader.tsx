import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from '../ThemeProvider'
import { ButtonCloseVariant } from '../button/ButtonClose'
import AbstractModalHeader, { AbstractModalHeaderProps } from './AbstractModalHeader'

import { PrefixOnlyProps } from '@ui/helpers'

import styles from './Modal.module.scss'

export interface ModalHeaderProps extends AbstractModalHeaderProps, PrefixOnlyProps {}

const propTypes = {
  prefix: PropTypes.string,
  closeLabel: PropTypes.string,
  closeVariant: PropTypes.oneOf<ButtonCloseVariant>(['white']),
  closeButton: PropTypes.bool,
  onHide: PropTypes.func,
}

const defaultProps = {
  closeLabel: 'Close',
  closeButton: false,
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ prefix: prefixProp, className, ...props }, ref) => {
    const prefix = usePrefix(prefixProp, 'modal-header')

    return (
      <AbstractModalHeader ref={ref} {...props} className={classNames(className, styles[prefix])} />
    )
  },
)

ModalHeader.displayName = 'ModalHeader'
ModalHeader.propTypes = propTypes
ModalHeader.defaultProps = defaultProps

export default ModalHeader
