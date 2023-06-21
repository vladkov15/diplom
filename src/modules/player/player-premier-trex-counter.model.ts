import { DeviceInfo as DeviceInfoBase } from '../app/app.service'

export type DeviceInfo = Omit<DeviceInfoBase, 'os_version' | 'device_type' | 'device_model'> & {
  device_platform: 'web'
}

export interface PlayerPremierTrexCounterWatchData extends DeviceInfo {
  content_id: string
  partner: string
}

export interface PlayerPremierTrexCounterHeartBeatData extends DeviceInfo {
  view_id: string
  position: number
  secs: number
}
