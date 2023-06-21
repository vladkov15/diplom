import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Breadcrumbs.module.scss'

const DEFAULT_KEYS = {
  cabinet: 'Личный кабинет',
  packets: 'Подписки',
  films: 'Фильмы',
  serials: 'Сериалы',
  tv: 'ТВ-каналы',
  genres: 'Жанры',
  pay: 'Оплата',
  about: 'О проекте',
  support: 'Техподдержка',
  contacts: 'Контакты',
  payments: 'Оплата',
  devices: 'Устройства',
  sport: 'Спорт',
  children: 'Детям',
  my: 'Мой ITV',
  statistics: 'Статистика',
  settings: 'Настройки',
  favorites: 'Избранное',
  ['promo-code']: 'Промокоды',
} as Record<string, string>

const convertBreadcrumb = (
  breadcrumb: IBreadcrumb,
  transformItem?: ((breadcrumb: IBreadcrumb) => React.ReactNode) | undefined,
): React.ReactNode => {
  if (transformItem) return transformItem(breadcrumb)
  return decodeURI(breadcrumb.label)
}

export interface IBreadcrumb {
  key: string
  label: string
  href: string
}

export interface IBreadcrumbsProps {
  rootItem?: IBreadcrumb
  omitRootItem?: boolean
  omitKeys?: string[]
  transformItem?: ((breadcrumb: IBreadcrumb) => React.ReactNode) | undefined
}

const Breadcrumbs = React.memo(
  ({
    rootItem = { key: 'home', label: 'Главная', href: '/' },
    omitRootItem = false,
    omitKeys = [],
    transformItem = undefined,
  }: IBreadcrumbsProps) => {
    const router = useRouter()
    const [breadcrumbs, setBreadcrumbs] = useState<Array<IBreadcrumb> | null>(null)

    useEffect(() => {
      if (router) {
        const pathnameArray = router.pathname.split('/')
        const asPathArray = router.asPath.split('/')

        pathnameArray.shift()
        asPathArray.shift()

        const pathArray = pathnameArray.map((key, i) => ({
          key,
          label: DEFAULT_KEYS[asPathArray[i]] || asPathArray[i],
          href: '/' + asPathArray.slice(0, i + 1).join('/'),
        }))

        setBreadcrumbs(pathArray)
      }
    }, [router])

    if (!breadcrumbs) return null

    return (
      <nav className={styles.Breadcrumbs} aria-label='breadcrumbs'>
        <ol className={styles.BreadcrumbsList}>
          {!omitRootItem && rootItem && (
            <li>
              <Link href='/'>{convertBreadcrumb(rootItem, transformItem)}</Link>
            </li>
          )}
          {breadcrumbs.length >= 1 &&
            breadcrumbs.map((breadcrumb) => {
              if (omitKeys?.includes(breadcrumb.key)) return
              return (
                <li key={breadcrumb.key}>
                  <Link href={breadcrumb.href}>{convertBreadcrumb(breadcrumb, transformItem)}</Link>
                </li>
              )
            })}
        </ol>
      </nav>
    )
  },
)

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
