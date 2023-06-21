import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Divider from '@ui/components/Divider'

import styles from './MainFooter.module.scss'
import Logo from './Logo'

const URL_IMAGE = [
  { url: '/assets/img/partners/visa.png', alt: 'VISA' },
  { url: '/assets/img/partners/visa_verify_by.png', alt: 'VISA Verify' },
  { url: '/assets/img/partners/mc.png', alt: 'MasterCard' },
  { url: '/assets/img/partners/mc_securecode.png', alt: 'MasterCard Secure Code' },
  { url: '/assets/img/partners/webpay.png', alt: 'webpay' },
  { url: '/assets/img/partners/ipay_life_1.png', alt: 'IPay life' },
  { url: '/assets/img/partners/ipay_life_2.png', alt: 'IPay MTC' },
  { url: '/assets/img/partners/erip.png', alt: 'Ерип' },
  { url: '/assets/img/partners/bepaid.png', alt: 'bePaid' },
  { url: '/assets/img/partners/belkart.png', alt: 'БЕЛКАРД' },
  { url: '/assets/img/partners/belkart_int.png', alt: 'БЕЛКАРД ИнтернетПароль' },
]

const SOCIAL = [
  { href: 'https://vk.com/itv_by', url: '/assets/img/socials/vk.png', alt: 'VK' },
  {
    href: 'https://www.instagram.com/itv.by/?hl=ru',
    url: '/assets/img/socials/instagram.png',
    alt: 'Instagram',
  },
  {
    href: 'https://www.facebook.com/itv.by',
    url: '/assets/img/socials/facebook.png',
    alt: 'Facebook',
  },
]

export const PAGES = [
  // { href: '/my', label: 'Мой ITV' },
  { href: '/tv', label: 'ТВ-каналы' },
  // { href: '/films', label: 'Фильмы' },
  // { href: '/serials', label: 'Сериалы' },
  { href: '/sport', label: 'Спорт' },
  { href: '/children', label: 'Детям' },
]

export const MORE_PAGES = [
  { href: '/about', label: 'О проекте' },
  { href: '/payments', label: 'Оплата' },
  // { href: '/devices', label: 'Устройства' },
  // { href: '/support', label: 'Техподдержка' },
  // { href: '/agreement', label: 'Пользовательское соглашение' },
  // { href: '/contacts', label: 'Контакты' },
]

const MainFooter: FC = () => {
  return (
    <div className={styles.MainFooter}>
      <div className={`${styles.MainFooter__Container} container`}>
        <div className={styles.MainFooter__ContentFirst}>
          <div className={styles.MainFooter__About}>
            <div className={styles.MainFooter__About__Logo}>
              {/* <Logo /> */}
              {/* <h2>Видеосервис ITV</h2> */}
              <h2>Видеосервис</h2>
            </div>
            {/* <p className={styles.MainFooter__About__Description}>
              Это телевидение, кино и сериалы на любом устройстве, подключенном к интернету, а также
              уникальные технологические решения: искусственный интеллект, робот-помощник iМаша,
              умный поиск, техподдержка, программа лояльности.
            </p> */}
            <p className={styles.MainFooter__About__Description}>
              Это телевидение на любом устройстве, подключенном к интернету.
            </p> 
          </div>
          <ul className={styles.MainFooter__LinkList}>
            {MORE_PAGES.map((page) => (
              <li key={page.href}>
                <Link href={page.href}>{page.label}</Link>
              </li>
            ))}
          </ul>
          <ul className={styles.MainFooter__LinkList}>
            {PAGES.map((page) => (
              <li key={page.href}>
                <Link href={page.href}>{page.label}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.MainFooter__Support}>
            <div className={styles.MainFooter__Support__Header}>
              <h4> Служба Техподдержки</h4>
              <p><a href="mailto:vkov2001@gmail.com">Support email: vkov2001@gmail.com</a></p>
              {/* <small>(с 10.00 до 24.00 ежедневно)</small> */}
            </div>
            {/* <ul className={styles.MainFooter__Support__Phones}>
              <li>
                <a href='tel:375173365520' target='_blank' rel='noopener noreferrer'>
                  + 375 (17) 336 55 20
                </a>
              </li>
              <li>
                <a href='tel:375291740214' target='_blank' rel='noopener noreferrer'>
                  + 375 (29) 174 02 14 (A1)
                </a>
              </li>
              <li>
                <a href='tel:375336006505' target='_blank' rel='noopener noreferrer'>
                  + 375 (33) 600 65 05 (МТС)
                </a>
              </li>
              <li>
                <a href='tel:375257440879' target='_blank' rel='noopener noreferrer'>
                  + 375 (25) 744 08 79 (life)
                </a>
              </li>
            </ul> */}
          </div>
        </div>

        <Divider size={30} />

        <div className={styles.MainFooter__ContentSecond}>
          {/* <ul className={styles.MainFooter__PolicyLinkList}>
            <li>
              <a href='http://new.itv.by/Agreement.pdf' target='_blank' rel='noopener noreferrer'>
                Публичный договор
              </a>
            </li>
            <li>
              <a href='http://new.itv.by/archive.rar' target='_blank' rel='noopener noreferrer'>
                Архив публичных договоров
              </a>
            </li>
            <li>
              <a href='http://new.itv.by/confid.pdf' target='_blank' rel='noopener noreferrer'>
                Политика конфедициальности
              </a>
            </li>
          </ul> */}
          {/* <div className={styles.MainFooter__Copyright}>
            <p>
              ООО «АйТиВи», {new Date().getFullYear()}. УНП 192563594. Зарегистрировано решением
              Мингорисполкома 12.11.2015г.
            </p>
            <p>
              220012, г. Минск, ул. Толбухина, 2, пом. 33 (4 этаж, оф. 413) Тел.{' '}
              <a href='tel:375173365520'>+375 (17) 336-55-20</a>,{' '}
              <a href='mailto:info@itv.by'>info@itv.by</a>.
            </p>
          </div>
          <ul className={styles.MainFooter__SocialList}>
            {SOCIAL.map((item) => (
              <li key={item.url}>
                <a href={item.href} target='_blank' rel='noopener noreferrer'>
                  <Image src={item.url} width={30} height={30} alt={item.alt} />
                </a>
              </li>
            ))}
          </ul> */}
          {/* <ul className={styles.MainFooter__PartnerList}>
            {URL_IMAGE.map((image) => (
              <li key={image.url}>
                <img src={image.url} alt={image.alt} />
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  )
}

export default MainFooter
