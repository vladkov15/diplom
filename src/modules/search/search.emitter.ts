import mitt from 'mitt'

export enum SearchEvents {
  SEARCH_MODAL_CLOSE = 'SEARCH_MODAL_CLOSE',
}

type Events = {
  SEARCH_MODAL_CLOSE: void
}

export const searchEmitter = mitt<Events>()
