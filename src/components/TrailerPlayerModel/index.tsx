import React, { FC, cloneElement, useState } from 'react'

import Modal from '@ui/components/modal'

import PlayerAspectRatioManager from '@/modules/player/components/PlayerAspectRatioManager'
import Player from '@/modules/player/components/Player'

import styles from './TrailerPlayerModal.module.scss'

interface TrailerPlayerModalProps {
  trigger?: React.ReactElement
  open?: boolean
  onOpen?: () => void
  onClose?: () => void
  children?: React.ReactNode
}

const TrailerPlayerModal: FC<TrailerPlayerModalProps> = ({
  trigger,
  open,
  onOpen,
  onClose,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(open)

  const handleOpen = () => {
    setInternalOpen(true)
    onOpen?.()
  }

  const handleClose = () => {
    setInternalOpen(false)
    onClose?.()
  }

  return (
    <div className={styles.TrailerPlayerModalWrapper}>
      {trigger
        ? cloneElement(trigger, { ...trigger.props, onClick: handleOpen }, trigger.props.children)
        : null}

      <Modal
        show={internalOpen}
        onHide={handleClose}
        className={styles.TrailerPlayerModal}
        contentClassName='bg-transparent'
        backdrop='static'
        keyboard={false}
        centered
        closeButton
      >
        <Modal.Body className={styles.TrailerPlayerModal__Body}>{children}</Modal.Body>
      </Modal>
    </div>
  )
}

export default TrailerPlayerModal
