import React, { FC } from 'react'

import { FilmContext } from './film.context'
import { IFilm } from './film.model'

interface FilmProviderProps {
  film: IFilm
  children: React.ReactNode
}

const FilmProvider: FC<FilmProviderProps> = ({ film, children }) => {
  return <FilmContext.Provider value={{ film }}>{children}</FilmContext.Provider>
}

export default FilmProvider
