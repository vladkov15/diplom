import React, { FC } from 'react'

import { wrapper } from '@/app/store'
import { ApiHelper } from '@/app/api'
import { filmApi, useGetFilmQuery } from '@/modules/film/film.api'

import DefaultLayout from '@/layouts/default'

import Breadcrumbs, { IBreadcrumb } from '@/components/Breadcrumbs'

import { IFilm } from '@/modules/film/film.model'
import FilmDetailCard from '@/modules/film/components/FilmDetailCard'

import styles from './FilmPage.module.scss'
import FilmProvider from '@/modules/film/FilmProvider'

const transformItem = (film?: IFilm) => {
  return ({ key, label }: IBreadcrumb) => {
    if (key === '[filmId]') return film?.name || ''
    return label
  }
}

interface FilmPageProps {
  filmId: number
}

const FilmPage: FC<FilmPageProps> = ({ filmId }) => {
  const { data: film } = useGetFilmQuery({ content_ptr: filmId, player: 1 })

  if (!film) return null

  return (
    <DefaultLayout
      pageTitle={film?.name}
      breadcrumbs={<Breadcrumbs transformItem={transformItem(film)} omitKeys={['genres']} />}
    >
      <div className={styles.FilmPage}>
        <div className={styles.FilmPage__MainContent}>
          <FilmProvider film={film}>
            <FilmDetailCard film={film} />
          </FilmProvider>
        </div>
        <div className={styles.FilmPage__Underside}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero autem dolor praesentium
          explicabo corrupti expedita amet numquam suscipit nisi quam sunt accusantium alias, quae
          assumenda iusto, ex quisquam harum sed.
        </div>
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const filmId = Number(ctx.query.filmId)

  const api = ApiHelper.getInstance()
  api.setContext(ctx)

  await store.dispatch(filmApi.endpoints.getFilm.initiate({ content_ptr: filmId, player: 1 }))

  await Promise.all(store.dispatch(filmApi.util.getRunningQueriesThunk()))

  return { props: { filmId } }
})

export default FilmPage
