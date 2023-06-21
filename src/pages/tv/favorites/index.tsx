import React, { FC } from 'react'

import { ApiHelper } from '@/app/api'
import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'

import { genreApi } from '@/modules/genre/genre.api'
import { favoriteApi } from '@/modules/favorite/favorite.api'

import PageTitle from '@/components/PageTitle'
import FavoritesChannelGrid from '@/modules/favorite/components/FavoritesChannelGrid'

const FavoritesChannels: FC = () => {
  return (
    <DefaultLayout>
      <PageTitle>Избранные ТВ-каналы</PageTitle>
      <FavoritesChannelGrid />
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  await store.dispatch(favoriteApi.endpoints.getFavoritesChannels.initiate())

  await Promise.all(store.dispatch(genreApi.util.getRunningQueriesThunk()))

  return { props: {} }
})

export default FavoritesChannels
