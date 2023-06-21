import DefaultLayout from '@/layouts/default'
import Divider from '@ui/components/Divider'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

import TutorialSlider from '@/modules/tutorial/components/TutorialSlider'
import { SMART_TV_TUTORIAL_ITEMS } from '@/modules/tutorial/components/TutorialSlider/tutorials'

import styles from '../about/AboutPage.module.scss'

const Description = () => {
  return (
    <div className={styles.Description}>
      <div className={styles.Description__Header}>
        <h2>
          Видеосервис ITV предлагает просмотр ТВ-каналов (в том числе в UHD-качестве), фильмов и
          сериалов на телевизорах SMART, мобильных телефонах и планшетах.
        </h2>
      </div>
      <div className={styles.Description__Body}>
        <p>Пользователям доступны уникальные технологические решения:</p>
        <ul>
          <li>
            индивидуальный канал для каждого зрителя, созданный искусственным интеллектом;-
            робот-помощник в выборе контента iМаша;
          </li>
          <li>умный поиск: искать контент можно на телефоне, а смотреть – на телевизоре;</li>
          <li>
            интерактивные взаимодействия с контентом: спортивные трансляции (ход игры, состав
            команд, букмекерские ставки) – все это доступно в режиме реального времени при просмотре
            видео, выставление личных рейтингов, просмотр того, что смотрят друзья, запрос
            дополнительной информации по контенту и др.
          </li>
          <li>
            тематические интерфейсы Детям и Спорт;- мобильный ассистент – управлять телевизором
            можно прямо с телефона;
          </li>
          <li>личная статистика для каждого пользователя по просмотрам, предпочтениям и т.д.</li>
          <li>
            <a href=''>Cписок каналов</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

const AboutPage: NextPageWithLayout = () => {
  return (
    <div className={styles.AboutPage}>
      {/* <Description /> */}
      

      {/* <Divider />

      <TutorialSlider title='Мастер обучения • SmartTV' items={SMART_TV_TUTORIAL_ITEMS} /> */}
    </div>
  )
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout pageTitle='О проекте'>{page}</DefaultLayout>
}

export default AboutPage
