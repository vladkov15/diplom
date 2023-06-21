export interface IMyChannelStatus {
  lg?: {
    films: boolean
    serials: boolean
  }
  status: number
  ut_time_full: number
  ut_time_left: number
  ut_time_watched: number
}

export interface IStatisticsChannel {
  name: string
  logo: string
  percent: number
  percent_string: string
}

export interface IStatisticsCategory {
  sum_count?: string
  name: string
  percent: number
  percent_string: string
}
