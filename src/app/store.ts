import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper'
import { GetServerSidePropsContext, NextPageContext } from 'next'
import { AppContext } from 'next/app'

import {
  configureStore,
  createAction,
  ImmutableStateInvariantMiddlewareOptions,
  SerializableStateInvariantMiddlewareOptions,
} from '@reduxjs/toolkit'

import { appApi } from '@/modules/app/app.api'
import { genreApi } from '@/modules/genre/genre.api'
import { profileApi } from '@/modules/profile/profile.api'
import { profileSlice } from '@/modules/profile/profile.slice'
import { filmApi } from '@/modules/film/film.api'
import { filmSlice } from '@/modules/film/film.slice'
import { serialApi } from '@/modules/serial/serial.api'
import { sportApi } from '@/modules/sport/sport.api'
import { childrenApi } from '@/modules/children/children.api'
import { serialSlice } from '@/modules/serial/serial.slice'
import { favoriteApi } from '@/modules/favorite/favorite.api'
import { channelApi } from '@/modules/channel/channel.api'
import { packetApi } from '@/modules/packets/packet.api'
import { payApi } from '@/modules/pay/pay.api'
import { statisticsApi } from '@/modules/statistics/statistics.api'
import { searchSlice } from '@/modules/search/search.slice'
import { parentControlApi } from '@/modules/parentControl/parentControl.api'
import { promoCodeApi } from '@/modules/promoCode/promoCode.api'
import { userApi } from '@/modules/user/user.api'
import { notificationApi } from '@/modules/notification/notification.api'

export interface ExtraArgument {
  ctx: NonNullable<NextPageContext | GetServerSidePropsContext>
}

interface ThunkOptions<E> {
  extraArgument: E
}

interface GetDefaultMiddlewareOptions {
  thunk?: boolean | ThunkOptions<ExtraArgument>
  immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions
  serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions
}

export const hydrate = createAction<AppState>(HYDRATE)

const api = {
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [serialApi.reducerPath]: serialApi.reducer,
    [sportApi.reducerPath]: sportApi.reducer,
    [childrenApi.reducerPath]: childrenApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [packetApi.reducerPath]: packetApi.reducer,
    [payApi.reducerPath]: payApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [promoCodeApi.reducerPath]: promoCodeApi.reducer,
    [parentControlApi.reducerPath]: parentControlApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    profile: profileSlice.reducer,
    film: filmSlice.reducer,
    serial: serialSlice.reducer,
    search: searchSlice.reducer,
  },
  middleware: [
    appApi.middleware,
    profileApi.middleware,
    genreApi.middleware,
    filmApi.middleware,
    serialApi.middleware,
    sportApi.middleware,
    childrenApi.middleware,
    favoriteApi.middleware,
    channelApi.middleware,
    packetApi.middleware,
    payApi.middleware,
    statisticsApi.middleware,
    promoCodeApi.middleware,
    parentControlApi.middleware,
    userApi.middleware,
    notificationApi.middleware,
  ],
}

export const makeStore = (context: Context) => {
  const appContext = context as AppContext
  const pageContext = context as NextPageContext | GetServerSidePropsContext
  const ctx = appContext.ctx || pageContext

  const extraArgument = { ctx } as ExtraArgument
  const options = { thunk: { extraArgument } }

  return configureStore({
    reducer: api.reducer,
    middleware: (gDM) => gDM<GetDefaultMiddlewareOptions>(options).concat(...api.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
