export enum Genres {
  ACTION = 1,
  DETECTIVE = 2,
  THRILLER = 3,
  DRAMA = 4,
  MELODRAMA = 5,
  COMEDY = 6,
  CHILDREN = 7,
  ENTERTAINMENT = 8,
  FICTION = 9,
  FANTASY = 10,
  HORROR = 11,
  HISTORICAL = 12,
  USSR = 13,
  ANIME = 14,
  CARTOON = 15,
  AMEDIATEKA = 16,
  START = 17,
  UHD = 18,
  REALITY_SHOW = 19,
  UPDATE = 20,
  PREMIER = 21,
}

export interface IContentGenre {
  id: number
  name: string
}

export enum ContentType {
  FILM = 1,
  SERIAL = 2,
  EPG = 3,
  CHANNEL = 4,
}

export enum Partner {
  PREMIER = 'premier',
  START = 'start',
  AMEDIATEKA = 'amediateka',
  AMEDIATEKA_DRM = 'amediatekaDRM',
  SEASONVAR = 'seasonvar',
}

export interface Resolution {
  name: string
  url: string
}

export interface IUrl {
  lang: string
  resolutions: Resolution[]
}

export interface IDrmLicenceServers {
  licence_server_fairplay?: string | null
  licence_server_playready?: string | null
  licence_server_widevine?: string | null
}

export interface IWatchInfo {
  duration: number
  selectet_translation_name: string
}

export interface IContent {
  id: number
  name: string
  actors: string | null
  added: string
  adult: number
  age: string
  auto_play: number
  comments: string
  content_group_ptr: number // ToDo: Нужно доопределить
  content_type_ptr: ContentType
  countries: string
  created: string
  description: string
  director: string | null
  duration: number
  favorites: number
  genres: string
  image: string
  smart_promo_img?: string
  locked: boolean
  partner: Partner | null
  partner_path: string | null
  rating_imdb: string
  rating_kinopoisk: string
  status: number
  trailer: string | null
  trailer_watched: boolean
  year: number

  urls?: IUrl[]
}
