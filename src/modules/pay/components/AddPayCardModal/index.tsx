import { FC } from 'react'

import Modal from '@ui/components/modal'

import AddPayCardForm from '../AddPayCardForm'

interface AddPayCardModalProps {
  open: boolean
  onClose?: () => void
}

const AddPayCardModal: FC<AddPayCardModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      show={open}
      onHide={onClose}
      contentClassName='bg-transparent'
      centered
      closeButton
    >
      <Modal.Body>
        <AddPayCardForm
          title='Добавить карту'
          description='Введите данные карты. Гарантируем безопасность платежей.'
        />
      </Modal.Body>
    </Modal>
  )
}

export default AddPayCardModal
