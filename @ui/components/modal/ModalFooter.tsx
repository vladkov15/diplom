import createWithPrefix from '@ui/utils/createWithPrefix'

import styles from './Modal.module.scss'

export default createWithPrefix('modal-footer', {
  defaultProps: { className: styles['modal-footer'] },
})
