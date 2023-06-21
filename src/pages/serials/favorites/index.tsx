import React, { FC } from 'react'

import { ApiHelper } from '@/app/api'
import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'

import { genreApi } from '@/modules/genre/genre.api'
import { favoriteApi } from '@/modules/favorite/favorite.api'

import PageTitle from '@/components/PageTitle'
import FavoritesSerialGrid from '@/modules/favorite/components/FavoritesSerialGrid'

const FavoritesSerials: FC = () => {
  return (
    <DefaultLayout>
      <PageTitle>Избранные сериалы</PageTitle>
      <FavoritesSerialGrid />
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  await store.dispatch(favoriteApi.endpoints.getFavoritesSerials.initiate())

  await Promise.all(store.dispatch(genreApi.util.getRunningQueriesThunk()))

  return { props: {} }
})

export default FavoritesSerials
