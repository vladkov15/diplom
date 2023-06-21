import React, { FC } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import SectionTitle from '../common/SectionTitle'

import styles from './QuestionSection.module.scss'

const QuestionSection: FC = React.memo(() => {
  return (
    <div className={cn(styles.QuestionSection, 'container')}>
      <div className={styles.QuestionSection__InfoContainer}>
        <SectionTitle>Остались вопросы?</SectionTitle>

        <div className={styles.SupportBlock}>
          <h4 className={styles.SupportBlock__Title}>Телефоны службы техподдержки</h4>
          <small>(с 10.00 до 22.00 ежедневно)</small>

          <ul className={styles.SupportBlock__Phones}>
            <li>
              <a href='tel:375173365520'>+ 375 (17) 336 55 20</a>
            </li>
            <li>
              <a href='tel:375336006505'>+ 375 (33) 600 65 05 (МТС)</a>
            </li>
            <li>
              <a href='tel:375291740214'>+ 375 (29) 174 02 14 (A1)</a>
            </li>
            <li>
              <a href='tel:375257440879'>+ 375 (25) 744 08 79 (life)</a>
            </li>
          </ul>

          <div className={styles.SupportBlock__Install}>
            <p>Установить приложение на телевизор можно из магазина приложений.</p>
            <p>
              Подробнее смотрите раздел <a href='#'>«Устройства»</a>.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.QuestionSection__ImageContainer}>
        <Image
          className={styles.QuestionSection__Image}
          src='/assets/img/home/question.png'
          alt=''
          fill
        />
      </div>
    </div>
  )
})
QuestionSection.displayName = 'QuestionSection'

export default QuestionSection
