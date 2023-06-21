import classNames from 'classnames'

import SectionTitle from '../common/SectionTitle'
import DevicesGrid from './DevicesGrid'

import styles from './InstallSection.module.scss'

const InstallSection = () => {
  return (
    <section className={classNames(styles.InstallSection, 'container')}>
      <SectionTitle label='Как установить приложение' withUnderline />

      <DevicesGrid
        title='Телевизоры'
        items={[
          {
            id: 1,
            title: 'Samsung',
            description: [
              <p key={1}>
                Samsung 2017-2021 г.в. – приложение называется ITV 2.0 и находится в магазине
                приложений.
              </p>,
              <p key={2}>
                Samsung 2012-2021 г.в. – приложение называется ITV и находится в магазине
                приложений.
              </p>,
            ],
          },
          {
            id: 2,
            title: 'LG',
            description: (
              <p>
                LG 2018-2021 г.в. с системой webOS 4.0 и выше – приложение называется ITV 2.0 и
                находится в магазине приложений.
              </p>
            ),
          },
          {
            id: 3,
            title: 'Android',
            description: (
              <p>
                Телевизоры и приставки на Android (версия 5.0 и выше)– приложение называется ITV 2.0
                и находится в Google Play. Устройства на Android (версии ниже 5.0) – приложение
                называется ITV BOX и находится в Google Play.
              </p>
            ),
          },
        ]}
      />

      <div className='mb-6' />

      <DevicesGrid
        title='Смартфоны'
        items={[
          {
            id: 1,
            image: '/assets/img/home/qr_honor.png',
            title: 'Android',
            description: (
              <p>
                Приложение называется «ITV 2.0 – мобильный ассистент». Работает на смартфонах с OS
                Android версии 5.0 и выше. Установить можно по{' '}
                <a href='#' target='_blank'>
                  ссылке
                </a>{' '}
                либо сканировав код.
              </p>
            ),
          },
          {
            id: 2,
            image: '/assets/img/home/qr_honor.png',
            title: 'iOS',
            description: (
              <p>
                Приложение называется «ITV 2.0 – мобильный ассистент». Работает на телефонах с iOS
                версии 10 и выше. Установить можно по{' '}
                <a href='#' target='_blank'>
                  ссылке
                </a>{' '}
                либо сканировав код.
              </p>
            ),
          },
          {
            id: 3,
            image: '/assets/img/home/qr_honor.png',
            title: 'HUAWEI и HONOR',
            description: (
              <p>
                Приложение называется «ITV 2.0 – мобильный ассистент». Работает на телефонах HUAWEI
                и HONOR с магазином приложений AppGallery. Установить можно по{' '}
                <a href='#' target='_blank'>
                  ссылке
                </a>{' '}
                либо сканировав код.
              </p>
            ),
          },
        ]}
      />
    </section>
  )
}

export default InstallSection
