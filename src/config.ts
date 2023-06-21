import { Genres } from './models/content'
import { Countries } from './models/countries'
import { ChannelCategories } from './modules/channel/channel.model'

import pckg from '../package.json'

export const { version } = pckg

export const NODE_ENV = process.env.NODE_ENV
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || ''
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || ''

export const API_URL = `${SERVER_URL}/api/v${API_VERSION}`

export const NEXT_AUTH_SECRET = process.env.NEXTAUTH_SECRET || 'itv'

export const GENRES = new Map([
  [Genres.ACTION, { label: 'Боевики', slug: 'action', order: 0 }],
  [Genres.DETECTIVE, { label: 'Детективы', slug: 'detective', order: 0 }],
  [Genres.THRILLER, { label: 'Триллеры', slug: 'thriller', order: 0 }],
  [Genres.DRAMA, { label: 'Драмы', slug: 'drama', order: 0 }],
  [Genres.MELODRAMA, { label: 'Мелодрамы', slug: 'melodrama', order: 0 }],
  [Genres.COMEDY, { label: 'Комедии', slug: 'comedy', order: 0 }],
  [Genres.CHILDREN, { label: 'Детские', slug: 'children', order: 0 }],
  [Genres.ENTERTAINMENT, { label: 'Развлечения', slug: 'entertainment', order: 0 }],
  [Genres.FICTION, { label: 'Фантастика', slug: 'fiction', order: 0 }],
  [Genres.FANTASY, { label: 'Фентези', slug: 'fantasy', order: 0 }],
  [Genres.HORROR, { label: 'Ужасы', slug: 'horror', order: 0 }],
  [Genres.HISTORICAL, { label: 'Исторические', slug: 'historical', order: 0 }],
  [Genres.USSR, { label: 'СССР', slug: 'ussr', order: 0 }],
  [Genres.ANIME, { label: 'Аниме', slug: 'anime', order: 0 }],
  [Genres.CARTOON, { label: 'Мультфильмы', slug: 'cartoon', order: 0 }],
  [Genres.AMEDIATEKA, { label: 'AMEDIATEKA', slug: 'amediateka', order: 1 }],
  [Genres.START, { label: 'START', slug: 'start', order: 3 }],
  [Genres.UHD, { label: 'UHD', slug: 'uhd', order: 4 }],
  [Genres.REALITY_SHOW, { label: 'Реалити шоу', slug: 'reality-show', order: 0 }],
  [Genres.UPDATE, { label: 'Обновления', slug: 'update', order: 0 }],
  [Genres.PREMIER, { label: 'PREMIER', slug: 'premier', order: 2 }],
])

export const CHANNEL_CATEGORIES = new Map([
  [ChannelCategories.BELARUS, { order: 1 }],
  [ChannelCategories.CHILDREN, { order: 0 }],
  [ChannelCategories.ENTERTAINMENT, { order: 0 }],
  [ChannelCategories.INFORMATION, { order: 2 }],
  [ChannelCategories.INTERNET, { order: 0 }],
  [ChannelCategories.MOVIE, { order: 0 }],
  [ChannelCategories.MUSIC, { order: 0 }],
  [ChannelCategories.POPULAR_SCIENCE, { order: 0 }],
  [ChannelCategories.SPORT, { order: 3 }],
  [ChannelCategories.UHD, { order: 0 }],
])

export const COUNTRIES = new Map([
  [Countries.RUSSIA, { label: 'Россия' }],
  [Countries.BELARUS, { label: 'Беларусь' }],
  [Countries.POLAND, { label: 'Польша' }],
])
