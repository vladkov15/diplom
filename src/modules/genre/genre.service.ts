import { Genres, IContentGenre } from '../../models/content'

const PARTNER_GENRES = [Genres.AMEDIATEKA, Genres.PREMIER, Genres.START]

const GENRES_FOR_SSR = PARTNER_GENRES

export const getPartnerGenres = (genres: IContentGenre[]) => {
  return genres.filter((genre) => PARTNER_GENRES.includes(genre.id))
}

export const getGenresForSSR = (genres: IContentGenre[], genresForSSR = GENRES_FOR_SSR) => {
  return genres.filter((genre) => genresForSSR.includes(genre.id))
}
