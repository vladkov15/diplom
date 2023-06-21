import React, { FC } from 'react'
import cn from 'classnames'

import SectionTitle from '../common/SectionTitle'
import SubscribeForm from './SubscribeForm'

import styles from './SubscribeSection.module.scss'

const SubscribeSection: FC = React.memo(() => {
  return (
    <section className={styles.SubscribeSection}>
      <div className={cn(styles.SubscribeSection__InnerContainer, 'container')}>
        <SectionTitle textAlign='center'>
          Подпишитесь на 1 месяц за 10 р. — <br />
          <span className='text-accent'>5 месяцев получите бесплатно!</span>
        </SectionTitle>

        <p className={styles.SubscribeSection__Description}>
          Для получения кода оплаты через ЕРИП введите ваш номер телефона.
          <br />
          На номер телефона придет смс с паролем для входа в приложение и кодом для оплаты через
          ЕРИП.
        </p>

        <div className='mb-6' />

        <SubscribeForm />
      </div>
    </section>
  )
})
SubscribeSection.displayName = 'SubscribeSection'

export default SubscribeSection
