import { IPacket } from '../packets/packet.model'

export enum ChannelCategories {
  BELARUS = 2,
  INFORMATION = 1,
  SPORT = 5,
  CHILDREN = 8,
  POPULAR_SCIENCE = 6,
  MUSIC = 4,
  ENTERTAINMENT = 3,
  UHD = 12,
  INTERNET = 13,
  MOVIE = 7,
}

export interface IChannelCategory {
  id: number
  name: string
  created: string
  sort: number
}

export enum EpgState {
  ARCHIVE_UNAVALAIBLE = 1,
  ARCHIVE = 2,
  LIVE = 3,
  FUTURE = 4,
  FUTURE_SUBSCRIBE = 5,
}

export interface IEpg {
  id: number
  channel_ptr: number
  name: string
  start_time: string
  end_time: string
  description: string
  duration: number
  age_ptr: number
  sport_ptr: number
  content_type_ptr: number
  year: string
  image: string
  notification: string
  state: EpgState | number
  channel_name: string
  url: string
  content_item: null
}

export interface IChannel {
  id: number
  name: string
  logo: string
  archive_enabled: number
  preview: string
  preview_default: string
  bonus_ch: number
  sleep_status: number
  sleep_url: number
  HD: number
  favorites: number
  content_group_ptr: number
  locked: number
  adult: number
  parent_control: number
  notification: number
  content_type_ptr: number
  available: number
  url: string
  epg_item: IEpg
  need_packets?: IPacket[]
}

export interface IEpgAvailableDates {
  current_start_time: string
  max_start_time: string
  min_start_time: string
}
