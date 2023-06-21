import { FC } from 'react'
import DefaultLayout from '../../layouts/default'

import { wrapper } from '@/app/store'

import { filmApi } from '@/modules/film/film.api'
import { serialApi } from '@/modules/serial/serial.api'

import MySlider from '@/modules/my/components/MySlider'
import UnfinishedFilmSlider from '@/modules/film/components/UnfinishedFilmSlider'
import FavoritesFilmSlider from '@/modules/favorite/components/FavoritesFilmSlider'
import FavoritesSerialSlider from '@/modules/favorite/components/FavoritesSerialSlider'
import FavoritesChannelSlider from '@/modules/favorite/components/FavoritesChannelSlider'
import { IContent } from '@/models/content'

import styles from './my.module.scss'
import { shuffle } from '@/app/utils'

interface MyITVProps {
  promoItems: IContent[]
}

const MyITV: FC<MyITVProps> = ({ promoItems }) => {
  return (
    <DefaultLayout>
      <div className={styles.My}>
        <div className={styles.My__MySlider}>
          <MySlider items={promoItems} />
        </div>

        <div className={styles.My__UnfinishedFilmSlider}>
          <UnfinishedFilmSlider />
        </div>

        <div className={styles.My__FavoritesFilmSlider}>
          <FavoritesFilmSlider title='Избранные фильмы' />
        </div>

        <div className={styles.My__FavoritesSerialSlider}>
          <FavoritesSerialSlider title='Избранные сериалы' />
        </div>

        <div className={styles.My__FavoritesChannelSlider}>
          <FavoritesChannelSlider title='Избранные ТВ каналы' />
        </div>
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    const promoFilms = await store.dispatch(filmApi.endpoints.getPromoFilms.initiate()).unwrap()
    const promoSerials = await store
      .dispatch(serialApi.endpoints.getPromoSerials.initiate())
      .unwrap()

    const promoItems = shuffle([...promoFilms, ...promoSerials]) as IContent[]

    await Promise.all(store.dispatch(filmApi.util.getRunningQueriesThunk()))
    await Promise.all(store.dispatch(serialApi.util.getRunningQueriesThunk()))

    return { props: { promoItems } }
  } catch (e) {}

  return { props: { promoItems: [] } }
})

export default MyITV
