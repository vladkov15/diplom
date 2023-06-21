import React, { FC } from 'react'

import { ApiHelper } from '@/app/api'
import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'

import { genreApi } from '@/modules/genre/genre.api'
import { favoriteApi } from '@/modules/favorite/favorite.api'

import PageTitle from '@/components/PageTitle'
import FavoritesFilmGrid from '@/modules/favorite/components/FavoritesFilmGrid'

const FavoritesFilms: FC = () => {
  return (
    <DefaultLayout>
      <PageTitle>Избранные фильмы</PageTitle>
      <FavoritesFilmGrid />
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  await store.dispatch(favoriteApi.endpoints.getFavoritesFilms.initiate())

  await Promise.all(store.dispatch(genreApi.util.getRunningQueriesThunk()))

  return { props: {} }
})

export default FavoritesFilms
