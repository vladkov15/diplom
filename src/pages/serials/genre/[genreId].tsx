import { FC } from 'react'

import { ApiHelper } from '@/app/api'
import { wrapper } from '@/app/store'

import DefaultLayout from '@/layouts/default'
import { fetchSerials } from '@/modules/serial/serial.actions'
import { ISerialGenre } from '@/modules/genre/genre.model'

import { useAppSelector } from '@/app/hooks'
import { genreApi } from '@/modules/genre/genre.api'
import { selectSerialGenreById } from '@/modules/genre/genre.selector'

import PageTitle from '@/components/PageTitle'
import SerialGrid from '@/modules/serial/components/SerialGrid'
import Breadcrumbs, { IBreadcrumb } from '@/components/Breadcrumbs'

const transformItem = (genre?: ISerialGenre) => {
  return ({ key, label }: IBreadcrumb) => {
    if (key === '[genreId]') return genre?.name || ''
    return label
  }
}

interface SerialsGenresProps {
  genreId: number
}

const SerialsGenres: FC<SerialsGenresProps> = ({ genreId }) => {
  genreApi.endpoints.getSerialGenres.useQuerySubscription(undefined)

  const genre = useAppSelector((state) => selectSerialGenreById(state, genreId))

  const breadcrumbs = <Breadcrumbs transformItem={transformItem(genre)} omitKeys={['genre']} />
  return (
    <DefaultLayout breadcrumbs={breadcrumbs}>
      {genre && <PageTitle>{genre.name}</PageTitle>}
      <SerialGrid genreId={genreId} />
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { genreId } = ctx.query

  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  await store.dispatch(genreApi.endpoints.getSerialGenres.initiate())

  const { serial } = store.getState()
  const { pagination } = serial.serials

  const query = { genre_ptr: Number(genreId) }
  await store.dispatch(fetchSerials({ query, pagination }))

  await Promise.all(store.dispatch(genreApi.util.getRunningQueriesThunk()))

  return { props: { genreId } }
})

export default SerialsGenres
