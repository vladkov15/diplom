import Image from 'next/image'

import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <Image
      className={styles.Logo}
      src='/assets/img/television.png'
      width={40}
      height={40}
      alt='Logo'
      priority
    />
  )
}

export default Logo
