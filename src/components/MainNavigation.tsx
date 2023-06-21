import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button } from '@ui'
import MainHeaderDropdown from './MainHeaderDropdown'

import styles from './MainNavigation.module.scss'

export const PAGES = [
  { id: 'home', href: '/', label: 'Главная' },
  // { id: 'my', href: '/my', label: 'Мой ITV' },
  { id: 'tv', href: '/tv', label: 'ТВ-каналы' },
  // { id: 'films', href: '/films', label: 'Фильмы' },
  // { id: 'serials', href: '/serials', label: 'Сериалы' },
  { id: 'sport', href: '/sport', label: 'Спорт' },
  { id: 'children', href: '/children', label: 'Детям' },
]

export const MORE_PAGES = [
  { id: 'about', href: '/about', label: 'О проекте' },
  // { id: 'payments', href: '/payments', label: 'Оплата' },
  // { id: 'devices', href: '/devices', label: 'Устройства' },
  // { id: 'support', href: '/support', label: 'Техподдержка' },
  // { id: 'contacts', href: '/contacts', label: 'Контакты' },
]

const MoreDropdownTrigger = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <Button ref={ref} className={styles.MoreDropdownTrigger} variant='icon' icon>
    <i {...props} className='icon-keyboard-control' />
  </Button>
))
MoreDropdownTrigger.displayName = 'MoreDropdownTrigger'

const MainNavigation: FC = () => {
  const router = useRouter()

  return (
    <nav className={styles.MainNavigation}>
      <ul className={styles.MainNavigation__MainList}>
        {PAGES.map((page) => (
          <li key={page.id}>
            <Link href={page.href} className={router.pathname === page.href ? 'active' : ''}>
              {page.label}
            </Link>
          </li>
        ))}
        <li className={styles.MainNavigation__MoreDropdown}>
          <MainHeaderDropdown trigger={MoreDropdownTrigger} bodyStyle={{ minWidth: 'auto' }} hover>
            <ul className={styles.MainNavigation__MoreList}>
              {MORE_PAGES.map((page) => (
                <li key={page.id}>
                  <Link href={page.href} className={router.pathname === page.href ? 'active' : ''}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MainHeaderDropdown>
        </li>
      </ul>
    </nav>
  )
}

MainNavigation.displayName = 'MainNavigation'

export default MainNavigation
