import mitt from 'mitt'

import { ContentType } from '@/models/content'

export enum FavoriteEvents {
  ADD_FAVORITE = 'ADD_FAVORITE',
  DELETE_FAVORITE = 'DELETE_FAVORITE',
}

export type ToggleFavoriteEvent = {
  id: number
  contentType: ContentType
}

type Events = {
  ADD_FAVORITE: ToggleFavoriteEvent
  DELETE_FAVORITE: ToggleFavoriteEvent
}

export const favoriteEmitter = mitt<Events>()
