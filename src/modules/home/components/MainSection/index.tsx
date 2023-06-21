import { useRouter } from 'next/router'
import classNames from 'classnames'

import Button from '@ui/components/button'

import styles from './MainSection.module.scss'

const MainSection = () => {
  const router = useRouter()

  return (
    <section className={styles.MainSection}>
      <video
        className={classNames(styles.MainSection__Video, 'is-fixed')}
        poster='/assets/img/john-wick-4.jpg'
        autoPlay
        loop
        muted
      >
        <source src='/assets/video/home/trailer.mp4' type='video/mp4' />
      </video>

      <header className={styles.MainSection__Header}>
        <h1 className={styles.MainSection__Title}>
          {/* Видеосервис */}
          Стриминг Сервис
          <br />
          {/* <b>ITV</b> */}
        </h1>
      </header>
      {/* <p className={styles.MainSection__Description}>
        Это телевидение, кино и сериалы на любом утройстве, подключенном к интернету, а также
        уникальные технологические решения: искусственный интеллект, робот-помощник iМаша, умный
        поиск, техподдержка, программа лояльности
      </p> */}
      <p className={styles.MainSection__Description}>
        Для просмотра каналов в интернете, по всему миру.
      </p>
      <Button label='Начать просмотр' onClick={() => router.push('/tv')} />
    </section>
  )
}

export default MainSection
