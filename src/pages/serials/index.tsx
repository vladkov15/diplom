import { NextPage } from 'next'
import { wrapper } from '@/app/store'
import { useAppSelector } from '@/app/hooks'

import { genreApi } from '@/modules/genre/genre.api'
import { selectSerialPartnerGenres } from '@/modules/genre/genre.selector'

import DefaultLayout from '@/layouts/default'

import { getPartnerGenres } from '@/modules/genre/genre.service'

import SerialGenreSlider from '@/modules/genre/components/SerialGenreSlider'
import PromoSerialSlider from '@/modules/serial/components/PromoSerialSlider'
import UnfinishedSerialSlider from '@/modules/serial/components/UnfinishedSerialSlider'
import FavoritesSerialSlider from '@/modules/favorite/components/FavoritesSerialSlider'
import SerialSlider from '@/modules/serial/components/SerialSlider'

import { serialApi } from '@/modules/serial/serial.api'
import { ISerialGenre } from '@/modules/genre/genre.model'

import styles from './SerialsPage.module.scss'

const PARTNER_ITEMS_LIMIT = 16

const SerialsPage: NextPage = () => {
  const genres = useAppSelector(selectSerialPartnerGenres)

  return (
    <DefaultLayout>
      <div className={styles.SerialsPage}>
        <div className={styles.SerialsPage__SerialGenreSlider}>
          <SerialGenreSlider />
        </div>

        <div className={styles.SerialsPage__PromoSerialSlider}>
          <PromoSerialSlider />
        </div>
        <div className={styles.SerialsPage__UnfinishedSerialSlider}>
          <UnfinishedSerialSlider />
        </div>
        <div className={styles.SerialsPage__FavoritesSerialSlider}>
          <FavoritesSerialSlider />
        </div>

        {genres.map((genre: ISerialGenre) => (
          <div className={styles.SerialsPage__SerialSlider} key={genre.id}>
            <SerialSlider genre={genre} limit={PARTNER_ITEMS_LIMIT} />
          </div>
        ))}
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    const { data: genres } = await store.dispatch(genreApi.endpoints.getSerialGenres.initiate())

    await store.dispatch(serialApi.endpoints.getPromoSerials.initiate())

    const promises = getPartnerGenres(genres || []).map((genre) =>
      store.dispatch(
        serialApi.endpoints.getSerialsByGenre.initiate({
          genre_ptr: genre.id,
          limit: PARTNER_ITEMS_LIMIT,
        }),
      ),
    )

    await Promise.all(promises)

    await Promise.all(store.dispatch(genreApi.util.getRunningQueriesThunk()))
    await Promise.all(store.dispatch(serialApi.util.getRunningQueriesThunk()))
  } catch (e) {}

  return { props: {} }
})

export default SerialsPage
