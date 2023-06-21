import React, { FC, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import Button from '@ui/components/button'
import Divider from '@ui/components/Divider'
import MainHeaderDropdown from '@/components/MainHeaderDropdown'

import { AuthContext } from '@/modules/auth/auth.context'
import { ProfileContext } from '../../profile.context'

import styles from './ProfileDropdown.module.scss'

const MENU_ITEMS = [
  { id: 'profile', href: '/cabinet', label: 'Профиль' },
  { id: 'settings', href: '/cabinet/settings', label: 'Настройки' },
  { id: 'packets', href: '/cabinet/packets', label: 'Подписки' },
  // { id: 'statistics', href: '/cabinet/statistics', label: 'Статистика' },
  { id: 'pay', href: '/cabinet/pay', label: 'Оплата' },
  // { id: 'promo', href: '/cabinet/promo-code', label: 'Промокоды' },
] as const

interface MenuItemProps {
  item: typeof MENU_ITEMS[number]
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
  return (
    <li>
      <Link href={item.href}>{item.label}</Link>
    </li>
  )
}

interface ProfileDropdown {
  trigger: React.ElementType
}

const ProfileDropdown: FC<ProfileDropdown> = ({ trigger }) => {
  const { signOut } = useContext(AuthContext)

  const { data: session } = useSession()

  const router = useRouter()

  const handleClickLogin = () => router.push('/login')
  const handleClickLogout = () => signOut()

  return (
    <div className={styles.ProfileDropdown}>
      <MainHeaderDropdown
        header={session ? <Link href='/cabinet'>Личный кабинет</Link> : <span>Личный кабинет</span>}
        trigger={trigger}
        align='end'
        hover
      >
        <ul className={styles.ProfileDropdownMenu}>
          {session && MENU_ITEMS.map((item) => <MenuItem item={item} key={item.id} />)}
          {session && (
            <li>
              <Divider size={20} />
            </li>
          )}
          <li>
            {session ? (
              <Button onClick={handleClickLogout} size='sm' full>
                Выйти из аккаунта
              </Button>
            ) : (
              <Button onClick={handleClickLogin} size='sm' full>
                Вход / Регистрация
              </Button>
            )}
          </li>
        </ul>
      </MainHeaderDropdown>
    </div>
  )
}
ProfileDropdown.displayName = 'ProfileDropdown'

export default ProfileDropdown
