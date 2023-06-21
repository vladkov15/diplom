import { ApiHelper } from '@/app/api'

import { IProfile } from './profile.model'
import { IChangePasswordResponse } from '@/modules/profile/profile.actions'

const ProfileService = (api: ApiHelper) => ({
  fetchProfile: async () => {
    return api.get<IProfile>('user_profile')
  },
  changePassword: async (data: FormData) => {
    return api.post<IChangePasswordResponse>('changePassword', { data })
  },
})

export default ProfileService
