import { createAsyncThunk } from '@reduxjs/toolkit'

import { ApiHelper, IApiErrorResponse } from '@/app/api'
import { IProfile } from './profile.model'

const api = ApiHelper.getInstance()

export const fetchUserProfile = createAsyncThunk<IProfile, void, { rejectValue: IApiErrorResponse }>(
  'profile/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.services.profile.fetchProfile()

      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(api.resolveError(e))
    }
  },
)

export const changePassword = createAsyncThunk<
  IChangePasswordResponse,
  changePasswordAttrs,
  { rejectValue: IApiErrorResponse }
>('profile/changePassword', async (attrs, thunkAPI) => {
  const { data: payload } = attrs
  try {
    const { data } = await api.services.profile.changePassword(payload)
    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

interface changePasswordAttrs {
  data: FormData
}

export interface IChangePasswordResponse {
  code: number
  msg: string
  token: string
}
