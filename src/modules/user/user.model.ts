export interface IUserSettings {
  parent_control: number
  auto_tv: number
  notifications: number
  backgroundVideo: number
  my_friends_enabled: number
  auto_tv_channel?: unknown
  posterTransition: number
  posterTransitionTime: number
  contentItemAutoClick: number
  contentItemAutoClickTime: number
  user_id: number
  tizen_player: number
  is_drm_support: boolean
  use_stable_player: boolean
  drm_player_type: IUserDrmPlayerType
  use_tv_program_notifications: number
  use_tv_program_part_auto_load_by_focus: number
  tv_program_part_auto_load_by_focus_time: number
}

interface IUserDrmPlayerType {
  LG: string
  SAMSUNG: string
}
