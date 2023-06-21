import { IChannelCategory } from '../channel/channel.model'

export enum SportCategories {
  FOOTBALL = 1,
  HOCKEY = 2,
  TENNIS = 3,
  HANDBALL = 4,
  BASKETBALL = 5,
  BIATHLON = 6,
}

export interface ISportCategory extends IChannelCategory {
  available: string
}

// export interface IEpg {
//   id: number
//   channel_ptr: number
//   name: string
//   start_time: string
//   end_time: string
//   description: string
//   duration: number
//   age_ptr: number
//   sport_ptr: number
//   content_type_ptr: number
//   year: string
//   image: string
//   notification: string
//   state: string
//   channel_name: string
//   url: string
//   content_item: null
// }

// export interface IChannel {
//   id: number
//   name: string
//   logo: string
//   archive_enabled: number
//   preview: string
//   preview_default: string
//   bonus_ch: number
//   sleep_status: number
//   sleep_url: number
//   HD: number
//   favorites: number
//   content_group_ptr: number
//   locked: number
//   adult: number
//   parent_control: number
//   notification: number
//   content_type_ptr: number
//   available: number
//   url: string
//   epg_item: IEpg
// }
