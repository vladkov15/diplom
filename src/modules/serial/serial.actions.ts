import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  ApiHelper,
  IApiErrorResponse,
  IApiFetchAllPayload,
  IApiFetchAllQueryAttr,
} from '../../app/api'
import { ISerial } from './serial.model'

export interface ISerialQueryAttr {
  genre_ptr?: number
  limit?: number
  offset?: number
}

const api = ApiHelper.getInstance()

export const fetchSerials = createAsyncThunk<
  IApiFetchAllPayload<ISerial>,
  IApiFetchAllQueryAttr<ISerialQueryAttr>,
  { rejectValue: IApiErrorResponse }
>('serial/fetchAll', async (attr, thunkAPI) => {
  try {
    const { data: items, headers } = await api.services.serial.fetchAll(attr)

    const totalItems = Number(headers['x-total-count']) || null

    return { items, totalItems }
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})
