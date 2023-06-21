export type DrmConfig = {
  servers?: Record<DrmTypes, string>
}

export enum DrmTypes {
  CLEAR_KEY = 'org.w3.clearkey',
  FAIRPLAY = 'com.apple.fps.1_0',
  PLAYREADY = 'com.microsoft.playready',
  WIDEVINE = 'com.widevine.alpha',
}
