import React from 'react'

import { IFilm } from './film.model'

export interface FilmContextValue {
  film: IFilm
}

export const FilmContext = React.createContext<FilmContextValue>({
  film: {} as IFilm,
})
FilmContext.displayName = 'FilmContext'
