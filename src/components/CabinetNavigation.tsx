import Link from 'next/link'
import { useRouter } from 'next/router'

import styled from './CabinetNavigation.module.scss'

const PAGES = [
  { id: 'profile', href: '/cabinet', label: 'Профиль' },
  { id: 'settings', href: '/cabinet/settings', label: 'Настройки' },
  // { id: 'packets', href: '/cabinet/packets', label: 'Подписки' },
  // { id: 'statistics', href: '/cabinet/statistics', label: 'Статистика' },
  { id: 'pay', href: '/cabinet/pay', label: 'Оплата' },
  // { id: 'promo', href: '/cabinet/promo-code', label: 'Промокоды' },
]

const CabinetNavigation = () => {
  const router = useRouter()

  return (
    <nav className={styled.CabinetNavigation}>
      <ul className={styled.CabinetNavigation__MenuList}>
        {PAGES.map((page) => (
          <li key={page.id}>
            <Link href={page.href} className={router.pathname === page.href ? 'active' : ''}>
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CabinetNavigation
