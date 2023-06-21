import { ApiHelper, IApiResponse } from '@/app/api'

import {
  PlayerPremierTrexCounterWatchData,
  PlayerPremierTrexCounterHeartBeatData,
} from '@/modules/player/player-premier-trex-counter.model'

interface PlayerPremierTrexCounterWatchParams {
  data: PlayerPremierTrexCounterWatchData
}

interface PlayerPremierTrexCounterHeartBeatParams {
  data: PlayerPremierTrexCounterHeartBeatData
}

const PREMIER_URL = 'premier/statistics'
const PREMIER_HB_URL = `${PREMIER_URL}/hb`

const PlayerPremierTrexCounterService = (api: ApiHelper) => ({
  sentWatch: async ({ data }: PlayerPremierTrexCounterWatchParams) => {
    return api.post<{ view_id: string }>(PREMIER_URL, { data })
  },
  sentHertBeat: async ({ data }: PlayerPremierTrexCounterHeartBeatParams) => {
    return api.post<IApiResponse>(PREMIER_HB_URL, { data })
  },
})

export default PlayerPremierTrexCounterService
