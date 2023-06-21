import { createSlice } from '@reduxjs/toolkit'

import { APIStatus, IApiErrorResponse } from '../../app/api'
import { fetchUserProfile } from './profile.actions'

import { hydrate } from '../../app/store'
import { IProfile } from './profile.model'

interface IProfileState {
  profile: {
    status: APIStatus
    data: IProfile | null
    error: IApiErrorResponse | null
  }
}

const initialState: IProfileState = {
  profile: {
    status: APIStatus.IDLE,
    data: null,
    error: null,
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      state.profile = action.payload.profile.profile
    })

    // FETCH USER PROFILE
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.profile.status = APIStatus.PENDING
    })
    builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
      state.profile.data = payload
      state.profile.status = APIStatus.FULFILLED
    })
    builder.addCase(fetchUserProfile.rejected, (state, { payload }) => {
      state.profile.status = APIStatus.REJECTED
      if (payload) state.profile.error = payload
    })
  },
})

// export const {} = userSlice.actions
