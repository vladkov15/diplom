import React, { FC } from 'react'

import Rating from '@/modules/player/components/controls/Rating'

import { IFilm } from '@/modules/film/film.model'
import { useSendFilmUserRatingMutation } from '@/modules/film/film.api'

interface FilmRatingProps {
  film: IFilm
}

const FilmRating: FC<FilmRatingProps> = React.memo(({ film }) => {
  const [sendFilmUserRating] = useSendFilmUserRatingMutation()

  const handleChange = (value: number) => {
    const data = { item_ptr: film.id, rating: value }
    sendFilmUserRating({ data })
  }

  return <Rating value={0} onChange={handleChange} />
})
FilmRating.displayName = 'FilmRating'

export default FilmRating
