import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '@/app/store'

import { channelApi } from './channel.api'
import { IChannelCategory } from './channel.model'

const selectCategoriesResult = channelApi.endpoints.getChannelCategories.select()

export const selectCategoryById = createSelector(
  selectCategoriesResult,
  (_: AppState, categoryId: number) => categoryId,
  ({ data }, categoryId: number) => data?.find(({ id }: IChannelCategory) => id === categoryId),
)
