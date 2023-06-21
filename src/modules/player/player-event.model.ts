import { ContentType } from '@/models/content'

export enum PlayerEventActionType {
  PLAY = 1,
  STOP = 2,
  PAUSE = 3,
  WATCHING = 4,
}

export enum PlayerType {
  WEB = 'WebPlayer',
}

export interface PlayerEventData {
  view_uid: string
  view_delay: number
  item_ptr: number
  player_type: PlayerType
  content_type_ptr: ContentType
  player_action_ptr: PlayerEventActionType
  duration: number
  timestamp: number
}
