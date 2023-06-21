import { FC, ReactElement } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { NextPageWithLayout } from '../_app'

import DefaultLayout from '@/layouts/default'

import Divider from '@ui/components/Divider'

import styles from './DevicesPage.module.scss'

interface IItem {
  id: number
  image?: string
  title: string
  description: React.ReactNode
}

const TV_DEVICES: IItem[] = [
  {
    id: 1,
    title: 'Телевизор с функцией Smart – Samsung',
    description: (
      <>
        <p>
          Samsung 2017-2021 г.в. — приложение называется ITV 2.0 и находится в магазине приложений
        </p>
        <p>Samsung 2012-2021 г.в. — приложение называется ITV и находится в магазине приложений</p>
      </>
    ),
  },
  {
    id: 2,
    title: 'Телевизор с функцией Smart - LG',
    description: (
      <>
        <p>
          LG 2018-2021 г.в. под управлением операционной системы webOS 4.0 и выше приложение
          называется ITV 2.0 и находится в магазине приложений.
        </p>
        <p>
          LG с OS NetCast и WebOS - приложение называется ITV и находится в магазине приложений.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: 'Другой телевизор с функцией Smart на базе OS Android',
    description: (
      <p>
        Телевизоры и приставки на Android (версия 5.0 и выше) — приложение называется ITV 2.0 и
        находится в Google Play.
      </p>
    ),
  },
  {
    id: 4,
    title: 'Телевизор без функции Smart – с приставкой от ITV',
    description: (
      <>
        <p>
          Если у вас телевизор без функции SMART, то при наличии учетной записи и оплаченного пакета
          iTV MEDIA вы можете БЕСПЛАТНО получить приставку в пользование.
        </p>
        <a href='#' className='mt-2'>
          Заявка на получение приставки
        </a>
      </>
    ),
  },
]

const TABLET_DEVICES: IItem[] = [
  {
    id: 1,
    image: '/assets/img/devices/qr_tablet_ios.png',
    title: 'Планшет с iOS',
    description: (
      <p>
        Приложение называется ITV 2.0 Tablet Edition. Работает на планшетах на базе iOS версии 11.0
        и выше. Установить можно по <a href='#'>ссылке</a>
      </p>
    ),
  },
]

const PHONE_DEVICES: IItem[] = [
  {
    id: 1,
    image: '/assets/img/devices/qr_phone_android.png',
    title: 'Смартфон с OS Android',
    description: (
      <p>
        Приложение называется «ITV 2.0 – мобильный ассистент». Работает на смартфонах с OS Android
        версии 5.0 и выше. Установить можно по <a href='#'>ссылке</a>
      </p>
    ),
  },
  {
    id: 2,
    image: '/assets/img/devices/qr_phone_ios.png',
    title: 'Смартфон с iOS',
    description: (
      <p>
        Приложение называется «ITV 2.0 – мобильный ассистент». Работает на телефонах с iOS версии 10
        и выше. Установить можно по <a href='#'>ссылке</a>
      </p>
    ),
  },
  {
    id: 3,
    image: '/assets/img/devices/qr_phone_honor.png',
    title: 'Смартфон HUAWEI и HONOR',
    description: (
      <p>
        Приложение называется «ITV 2.0 – мобильный ассистент». Работает на телефонах HUAWEI и HONOR
        с магазином приложений AppGallery. Установить можно по <a href='#'>ссылке</a>
      </p>
    ),
  },
]

interface DevicesInfoProps {
  title: string
  devices: IItem[]
}

const DevicesInfo: FC<DevicesInfoProps> = ({ title, devices }) => {
  return (
    <div className={styles.DevicesInfo}>
      <div className={styles.DevicesInfo__Header}>
        <h3 className={styles.DevicesInfo__Title}>{title}</h3>
      </div>
      <div className={styles.DevicesInfo__Body}>
        <ul className={styles.DevicesList}>
          {devices.map(({ id, image, title, description }) => (
            <li
              className={classNames({
                [styles.DevicesItem]: true,
                [styles.DevicesItem__WithImage]: !!image,
              })}
              key={id}
            >
              {image && (
                <div className={styles.DevicesItem__ImageWrapper}>
                  <Image src={image} width={96} height={140} alt={title} />
                </div>
              )}
              <div className={styles.DevicesItem__Body}>
                <h5 className={styles.DevicesItem__Title}>{title}</h5>
                <div className={styles.DevicesItem__Description}>{description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const DevicesPage: NextPageWithLayout = () => {
  return (
    <div className={styles.DevicesPage}>
      <DevicesInfo title='Телевизоры' devices={TV_DEVICES} />

      <Divider />

      <DevicesInfo title='Планшеты' devices={TABLET_DEVICES} />

      <Divider />

      <DevicesInfo title='Смартфон' devices={PHONE_DEVICES} />
    </div>
  )
}

DevicesPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout pageTitle='Устройства'>{page}</DefaultLayout>
}

export default DevicesPage
