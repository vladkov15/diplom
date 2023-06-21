import { NextPage } from 'next'
import { useAppSelector } from '@/app/hooks'

import { wrapper } from '@/app/store'
import { filmApi } from '@/modules/film/film.api'

import DefaultLayout from '@/layouts/default'

import FilmGenreSlider from '@/modules/genre/components/FilmGenreSlider'
import PromoFilmSlider from '@/modules/film/components/PromoFilmSlider'
import FavoritesFilmSlider from '@/modules/favorite/components/FavoritesFilmSlider'
import UnfinishedFilmSlider from '@/modules/film/components/UnfinishedFilmSlider'
import FilmSlider from '@/modules/film/components/FilmSlider'

import { genreApi } from '@/modules/genre/genre.api'
import { selectFilmPartnerGenres } from '@/modules/genre/genre.selector'
import { IFilmGenre } from '@/modules/genre/genre.model'
import { getPartnerGenres } from '@/modules/genre/genre.service'

import styles from './FilmsPage.module.scss'

const PARTNER_ITEMS_LIMIT = 16

const FilmsPage: NextPage = () => {
  const genres = useAppSelector(selectFilmPartnerGenres)

  return (
    <DefaultLayout>
      <div className={styles.FilmsPage}>
        <div className={styles.FilmsPage__FilmGenreSlider}>
          <FilmGenreSlider />
        </div>

        <div className={styles.FilmsPage__PromoFilmSlider}>
          <PromoFilmSlider />
        </div>
        <div className={styles.FilmsPage__UnfinishedFilmSlider}>
          <UnfinishedFilmSlider />
        </div>
        <div className={styles.FilmsPage__FavoritesFilmSlider}>
          <FavoritesFilmSlider />
        </div>

        {genres.map((genre: IFilmGenre) => (
          <div className={styles.FilmsPage__FilmSlider} key={genre.id}>
            <FilmSlider genre={genre} limit={PARTNER_ITEMS_LIMIT} />
          </div>
        ))}
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    const { data: genres } = await store.dispatch(genreApi.endpoints.getFilmGenres.initiate())

    store.dispatch(filmApi.endpoints.getPromoFilms.initiate())

    getPartnerGenres(genres || []).map((genre) =>
      store.dispatch(
        filmApi.endpoints.getFilmsByGenre.initiate({
          genre_ptr: genre.id,
          limit: PARTNER_ITEMS_LIMIT,
        }),
      ),
    )

    await Promise.all(store.dispatch(genreApi.util.getRunningQueriesThunk()))
    await Promise.all(store.dispatch(filmApi.util.getRunningQueriesThunk()))
  } catch (e) {}

  return { props: {} }
})

export default FilmsPage
