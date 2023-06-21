import { version } from '@/config'

export type AppInfo = {
  app_version: string
}

export const getAppInfo = async () => {
  return { app_version: version }
}

export type DeviceInfo = {
  device_uid: string
  os: string
  os_version: string
  device_type: string
  device_model: string
}

export const getDeviceInfo = async (): Promise<DeviceInfo> => {
  const { DeviceUUID } = await import('device-uuid')

  const du = new DeviceUUID()

  const { os, source } = du.parse()
  const uuid = du.get()

  return {
    device_uid: uuid,
    os: 'web',
    os_version: os,
    device_type: 'web',
    device_model: source,
  }
}
