import { ReactElement, useState } from 'react'
import Link from 'next/link'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

import DefaultLayout from '@/layouts/default'
import Divider from '@ui/components/Divider'

import { NextPageWithLayout } from '../_app'

import styles from './ContactsPage.module.scss'
import { Loader } from '@ui/index'

const info = [
  {
    title: 'Адрес:',
    content: <p>220012, г. Минск, ул. Толбухина, 2, пом. 33 (4 этаж, оф. 413)</p>,
  },
  {
    title: 'Телефон:',
    content: <a href='tel:375173365520'>+375 (17) 336 55 20</a>,
  },
  {
    title: 'Электронная почта:',
    content: <a href='mailto:info@itv.by'>info@itv.by</a>,
  },
  {
    content: <Divider size={20} />,
  },
  {
    title: 'Время работы службы поддержки:',
    content: <p>с 10.00 до 24.00 без выходных.</p>,
  },
  {
    title: 'Телефоны службы технической поддержки:',
    content: (
      <div className='d-flex flex-column'>
        <a href='tel:375291740214'>+375 (29) 174 02 14 (А1)</a>
        <a href='tel:375336006505'>+375 (33) 600 65 05 (МТС)</a>
        <a href='tel:375257440879'>+375 (25) 744 08 79 (life)</a>
      </div>
    ),
  },
]

const ContactsPage: NextPageWithLayout = () => {
  const [mapLoading, setMapLoading] = useState(true)

  return (
    <div className={styles.ContactsPage}>
      <div className={styles.ContactsPage__InfoContainer}>
        <h2 className={styles.ContactsPage__InfoTitle}>
          ООО «АйТиВи»
        </h2>
        <p className={styles.ContactsPage__InfoDescription}>
          УНП 192563594. Зарегистрировано решением Мингорисполкома 12.11.2015 г.
        </p>

        <div className='mb-5' />

        <ul className={styles.ContactsInfo}>
          {info.map((item, index) => (
            <li key={index}>
              {item.title && <h5 className={styles.ContactsInfo__Title}>{item.title}</h5>}
              <div className={styles.ContactsInfo__Content}>{item.content}</div>
            </li>
          ))}
        </ul>

        <div className={styles.ContactsPage__InfoFooter}>
          <p>
            Если вы не можете дозвониться, напишите, пожалуйста, письмо, чтобы мы могли улучшить
            качество нашего сервиса.
          </p>
          <small>
            Адрес электронной почты службы технической поддержки:{' '}
            <Link href='/support'>support@itv.by.</Link>
          </small>
        </div>
      </div>
      <div className={styles.ContactsPage__MapContainer}>
        {mapLoading && <Loader className={styles.ContactsPage__MapLoader} />}
        <YMaps>
          <Map
            onLoad={() => setMapLoading(false)}
            defaultState={{ center: [53.926112, 27.614706], zoom: 15 }}
            width='100%'
            height='100%'
          >
            <Placemark geometry={[53.926112, 27.614706]} />
          </Map>
        </YMaps>
      </div>
    </div>
  )
}

ContactsPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout pageTitle='Контакты'>{page}</DefaultLayout>
}

export default ContactsPage
