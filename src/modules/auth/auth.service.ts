import { ApiHelper, IApiResponse } from '@/app/api'

import { AppInfo, DeviceInfo } from '../app/app.service'

export interface ILoginResponse {
  token: string
}

export default (api: ApiHelper) => ({
  login: async (login: string, password: string, info: AppInfo & DeviceInfo) => {
    return api.post<ILoginResponse>('login', { data: { login, password, ...info } })
  },

  logout: async () => {
    return api.post<IApiResponse>('logout')
  },

  me: async () => {
    return api.get('me')
  },

  checkUser: async (login: string) => {
    return api.post<IApiResponse>('check_user', { data: { login } })
  },

  resetPassword: async (login: string) => {
    return api.post<IApiResponse>('reset_password', { data: { login } })
  },
})
