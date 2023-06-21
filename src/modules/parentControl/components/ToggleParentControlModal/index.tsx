import React, { FC, cloneElement, useState } from 'react'

import Modal from '@ui/components/modal'

import styles from './ToggleParentControlModal.module.scss'

interface ToggleParentControlModalProps {
  trigger?: React.ReactElement
  open?: boolean
  onClose?: () => void
  children?: React.ReactElement
}

const ToggleParentControlModal: FC<ToggleParentControlModalProps> = ({
  trigger,
  open,
  onClose,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(open)

  const handleOpen = () => {
    setInternalOpen(true)
  }

  const handleClose = () => {
    setInternalOpen(false)
    onClose?.()
  }

  return (
    <div className={styles.ToggleParentControlModal}>
      {trigger
        ? cloneElement(trigger, { ...trigger.props, onClick: handleOpen }, trigger.props.children)
        : null}
      <Modal
        show={internalOpen}
        onHide={handleClose}
        contentClassName='bg-transparent'
        backdrop='static'
        keyboard={false}
        centered
        closeButton
      >
        <Modal.Body className={styles.ToggleParentControlModal__Body}>
          {children
            ? cloneElement(
                children,
                { ...children.props, onToggleSuccess: handleClose },
                children.props.children,
              )
            : null}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ToggleParentControlModal
