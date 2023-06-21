import { IContent, IDrmLicenceServers, IUrl, IWatchInfo, Partner } from '@/models/content'
import { Omit } from '@ui/helpers'

export interface ISerial extends IContent {
  seasons: ISeason[]
  watching_info: ISerialWatchInfo | null
}

export interface ISerialWatchInfo extends IWatchInfo {
  season: ISeason
  serie: IEpisode
}

export interface ISeason {
  id: number
  name: string
  number: string
  serial_ptr: number
  series_count: number
  image: string
}

export type ISeasonEpisode = Omit<IEpisode, 'urls'>

export interface ISerialInfo {
  serial_name: string
  season_number: number
}

export interface IRatingDialog {
  show: number
  duration: number
}

export interface IEpisode extends IDrmLicenceServers {
  id: number
  name: string
  image: string
  duration: number
  season_ptr: number
  created: string
  number: number
  serial_ptr: number
  url: string
  updated: string
  release_date: string
  watched?: string | null
  selected_translation_name?: string | null
  season_number: number
  serial_info: ISerialInfo
  watching_info?: string | null
  partner: Partner
  partner_path: string
  subtitles: number
  rating_dialog: IRatingDialog
  available: number
  urls: IUrl[]
}
