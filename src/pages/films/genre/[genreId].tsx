import React, { FC } from 'react'

import { ApiHelper } from '@/app/api'
import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'
import { fetchFilms } from '@/modules/film/film.actions'
import { IFilmGenre } from '@/modules/genre/genre.model'

import { useAppSelector } from '@/app/hooks'
import { genreApi } from '@/modules/genre/genre.api'
import { selectFilmGenreById } from '@/modules/genre/genre.selector'

import PageTitle from '@/components/PageTitle'
import FilmGrid from '@/modules/film/components/FilmGrid'
import Breadcrumbs, { IBreadcrumb } from '@/components/Breadcrumbs'

const transformItem = (genre?: IFilmGenre) => {
  return ({ key, label }: IBreadcrumb) => {
    if (key === '[genreId]') return genre?.name || ''
    return label
  }
}

interface FilmsGenresProps {
  genreId: number
}

const FilmsGenres: FC<FilmsGenresProps> = ({ genreId }) => {
  genreApi.endpoints.getFilmGenres.useQuerySubscription(undefined)

  const genre = useAppSelector((state) => selectFilmGenreById(state, genreId))

  const breadcrumbs = <Breadcrumbs transformItem={transformItem(genre)} omitKeys={['genre']} />
  return (
    <DefaultLayout breadcrumbs={breadcrumbs}>
      {genre && <PageTitle>{genre.name}</PageTitle>}
      <FilmGrid genreId={genreId} />
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const genreId = Number(ctx.query.genreId)

  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  await store.dispatch(genreApi.endpoints.getFilmGenres.initiate())

  const { film } = store.getState()
  const { pagination } = film.films

  const query = { genre_ptr: genreId }
  await store.dispatch(fetchFilms({ query, pagination }))

  await Promise.all(store.dispatch(genreApi.util.getRunningQueriesThunk()))

  return { props: { genreId } }
})

export default FilmsGenres
