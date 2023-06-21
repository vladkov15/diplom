import { ReactElement, useEffect, useMemo, useRef } from 'react'

import { getDeviceInfo } from '@/modules/app/app.service'
import { ApiHelper } from '@/app/api'
import { Partner } from '@/models/content'

import {
  PlayerPremierTrexCounterWatchData,
  PlayerPremierTrexCounterHeartBeatData,
  DeviceInfo,
} from '@/modules/player/player-premier-trex-counter.model'

import PlayerTrexCounterManager, {
  PlayerTrexCounterManagerProps,
  PlayerTrexCounterRenderParameters,
} from '@/modules/player/components/PlayerTrexCounterManager'

type OmitPlayerTrexCounterManagerPropsProps = Omit<PlayerTrexCounterManagerProps, 'children'>

export interface PlayerPremierTrexCounterRenderParameters
  extends PlayerTrexCounterRenderParameters {
  partner?: Partner | null
  partnerContentId?: string | null
}

export interface PlayerPremierTrexCounterManagerProps
  extends Partial<OmitPlayerTrexCounterManagerPropsProps> {
  partner?: Partner | null
  partnerContentId?: string | null
  children: (params: PlayerPremierTrexCounterRenderParameters) => ReactElement
}

const DEVICE_PLATFORM = 'web'

const api = ApiHelper.getInstance()

const PlayerPremierTrexCounterManager = ({
  partnerContentId,
  partner,
  minutesForWatchEvent,
  minutesForHearBeatEvent,
  children,
  ...props
}: PlayerPremierTrexCounterManagerProps) => {
  const viewIdRef = useRef<string>('')
  const partnerRef = useRef<Partner | null | undefined>(partner)
  const partnerContentIdRef = useRef<string | null | undefined>(partnerContentId)
  const minutesForWatchEventRef = useRef<number | undefined>(minutesForWatchEvent)
  const minutesForHearBeatEventRef = useRef<number | undefined>(minutesForHearBeatEvent)

  const deviceInfoRef = useRef<DeviceInfo>({
    os: 'webos',
    device_uid: '',
    device_platform: DEVICE_PLATFORM,
  })

  useEffect(() => {
    getDeviceInfo().then(({ device_uid, os_version }) => {
      deviceInfoRef.current = {
        os: os_version,
        device_uid,
        device_platform: DEVICE_PLATFORM,
      }
    })
  }, [])

  useEffect(() => {
    partnerRef.current = partner // ToDO (hardz): Убрать, так как понятно что это Premier :)
    partnerContentIdRef.current = partnerContentId
    minutesForWatchEventRef.current = minutesForWatchEvent
    minutesForHearBeatEventRef.current = minutesForHearBeatEvent
  }, [partner, partnerContentId, minutesForWatchEvent, minutesForHearBeatEvent])

  const prepareDataForWatch = (): PlayerPremierTrexCounterWatchData | undefined => {
    // if (partnerRef.current !== Partner.START) return // ToDO (hardz): Вынести в базовый менеджер, добавить возможность выключать через пропс
    if (!partnerContentIdRef.current) return
    if (!partnerRef.current) return

    return {
      content_id: partnerContentIdRef.current,
      partner: partnerRef.current,
      ...deviceInfoRef.current,
    }
  }

  const prepareDataForHeartBeat = (
    position: number,
    secs: number,
  ): PlayerPremierTrexCounterHeartBeatData => {
    return {
      ...deviceInfoRef.current,
      view_id: viewIdRef.current,
      secs,
      position: Math.floor(position),
    }
  }

  const setViewId = (viewId: string) => {
    viewIdRef.current = viewId
  }

  const watch = async () => {
    const data = prepareDataForWatch()
    try {
      console.log('watch ', data)
      const view_id = 'test_view_id'
      // const { view_id } = await api?.services.playerPremierTrexCounter.sentWatch(data)
      setViewId(view_id)
    } catch (e) {
      console.log(e)
    }
  }

  const heartBeat = async (currentTime: number, timer: number) => {
    const data = prepareDataForHeartBeat(currentTime, timer)
    try {
      console.log('HB ', data)
      // await api?.services.playerPremierTrexCounter.sentHeartBeat(data)
    } catch (e) {
      console.log(e)
    }
  }

  const playerTrexCounterManagerProps: OmitPlayerTrexCounterManagerPropsProps = useMemo(() => {
    return {
      ...props,
      minutesForHearBeatEvent: minutesForHearBeatEventRef.current,
      minutesForWatchEvent: minutesForWatchEventRef.current,
      watch,
      heartBeat,
    }
  }, [minutesForWatchEvent, minutesForHearBeatEvent, partner, partnerContentId])

  return (
    <PlayerTrexCounterManager
      {...playerTrexCounterManagerProps}
      disabled={partner !== Partner.START}
    >
      {(statisticState) => children({ partner, partnerContentId, ...statisticState })}
    </PlayerTrexCounterManager>
  )
}

export default PlayerPremierTrexCounterManager
