import React, { cloneElement, FC, useContext, useState } from 'react'

import Modal from '@ui/components/modal'
import PageTitle from '@/components/PageTitle'
import EpgWeekProgram from './EpgWeekProgram'

import { ChannelContext } from '../channel.context'

import styles from './EpgWeekProgramModal.module.scss'

interface EpgWeekProgramModalProps {
  trigger?: React.ReactElement
  open?: boolean
  onClose?: () => void
}

const EpgWeekProgramModal: FC<EpgWeekProgramModalProps> = ({ trigger, open, onClose }) => {
  const { epgProgram } = useContext(ChannelContext)
  const [internalOpen, setInternalOpen] = useState(open)

  const handleOpen = () => {
    setInternalOpen(true)
  }

  const handleClose = () => {
    setInternalOpen(false)
    onClose?.()
  }

  if (!epgProgram) return null

  return (
    <div className={styles.EpgWeekProgramModal}>
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
        fullscreen
      >
        <Modal.Header className={styles.EpgWeekProgramModal__Header}>
          <PageTitle className='text-none'>
            Программа передач канала {epgProgram.channel_name}
          </PageTitle>
        </Modal.Header>
        <Modal.Body className={styles.EpgWeekProgramModal__Body}>
          <EpgWeekProgram />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default EpgWeekProgramModal
