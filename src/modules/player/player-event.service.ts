import { PlayerEventData } from './player-event.model'

import { ApiHelper, IApiResponse } from '@/app/api'

interface PlayerEventParams {
  data: PlayerEventData
}

const PlayerEventService = (api: ApiHelper) => ({
  sentPlayerEvent: async ({ data }: PlayerEventParams) => {
    return api.post<IApiResponse>('player_events_web', { data })
  },

  // XMLHttpRequest
  //
  // sentPlayerEventSync: async ({ data }: PlayerEventParams) => {
  //   const token = api.getTokenFromCookie()
  //
  //   const request = new XMLHttpRequest()
  //
  //   request.open('POST', `${API_URL}/player_events_web`, false)
  //   request.setRequestHeader('Content-Type', 'application/json')
  //   request.setRequestHeader('Authorization', `Bearer ${token}`)
  //
  //   request.onreadystatechange = () => {}
  //
  //   request.send(JSON.stringify(data))
  // },

  // fetch keepAlive
  //
  // sentPlayerEventSync: async ({ data }: PlayerEventParams) => {
  //   const token = api.getTokenFromCookie()

  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   }
  //   const response = await fetch(`${API_URL}/player_events_web`, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers,
  //     keepalive: true,
  //   })

  //   return response.json()
  // },

  // Navigator.sendBeacon - NOT WORKING
  //
  // sentPlayerEventSync: async ({ data }: PlayerEventParams) => {
  //   const token = api.getTokenFromCookie()

  //   const headers = {
  //     type: 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   }
  //   const blob = new Blob([JSON.stringify(data)], headers)
  //   navigator.sendBeacon(`${API_URL}/player_events_web`, blob)
  // },
})

export default PlayerEventService
