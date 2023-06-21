import React, { FC } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { APIStatus } from '@/app/api'
import ContentGrid from '@/components/ContentGrid'
import FilmCard from './FilmCard'

import { IFilm } from '../film.model'
import { fetchFilms } from '../film.actions'
import { setFilmsPagination } from '../film.slice'

interface FilmGridProps {
  genreId: number
}

const FilmGrid: FC<FilmGridProps> = ({ genreId }) => {
  const dispath = useAppDispatch()

  const films = useAppSelector((state) => state.film.films)

  const handleChangePage = (currentPage: number, perPage: number) => {
    dispath(setFilmsPagination({ currentPage, perPage }))

    const query = { genre_ptr: genreId }
    const pagination = { currentPage, perPage }
    dispath(fetchFilms({ query, pagination }))
  }

  return (
    <ContentGrid
      items={films.items}
      itemRenderFn={(item) => <FilmCard item={item as IFilm} key={item.id} />}
      loading={films.status === APIStatus.PENDING}
      loadMore={{
        ...films.pagination,
        busy: films.status === APIStatus.PENDING,
        onChangePage: handleChangePage,
      }}
    />
  )
}

export default FilmGrid
