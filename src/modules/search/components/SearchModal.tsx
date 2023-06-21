import React, { FC, cloneElement, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Modal from '@ui/components/modal'

import PageTitle from '@/components/PageTitle'
import Search from '@/modules/search/components/Search'

import { resetSearchResults } from '../search.slice'

import styles from './SearchModal.module.scss'
import { searchEmitter, SearchEvents } from '../search.emitter'

interface SearchModalProps {
  trigger?: React.ReactElement
  open?: boolean
  onClose?: () => void
}

const SearchModal: FC<SearchModalProps> = ({ trigger, open, onClose }) => {
  const dispatch = useDispatch()
  const [internalOpen, setInternalOpen] = useState(open)

  useEffect(() => {
    searchEmitter.on(SearchEvents.SEARCH_MODAL_CLOSE, handleClose)

    return () => {
      searchEmitter.off(SearchEvents.SEARCH_MODAL_CLOSE, handleClose)
    }
  })

  const handleOpen = () => {
    setInternalOpen(true)
  }

  const handleClose = () => {
    setInternalOpen(false)
    onClose?.()

    dispatch(resetSearchResults())
  }

  return (
    <div className={styles.SearchModal}>
      {trigger
        ? cloneElement(trigger, { ...trigger.props, onClick: handleOpen }, trigger.props.children)
        : null}
      <Modal
        show={internalOpen}
        onHide={handleClose}
        className={styles.SearchModal}
        contentClassName='bg-transparent'
        backdrop='static'
        keyboard={false}
        centered
        closeButton
        fullscreen
      >
        <Modal.Header className={styles.SearchModal__Header}>
          <PageTitle>Поиск</PageTitle>
        </Modal.Header>
        <Modal.Body className={styles.SearchModal__Body}>
          <Search />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SearchModal
