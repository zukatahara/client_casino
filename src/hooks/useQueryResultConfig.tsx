import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { LotteryResultConfig } from '@/types/bet.type'

export type QueryConfig = {
  [key in keyof LotteryResultConfig]: string
}

export default function useQueryResultConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
        startDate: queryParams.startDate,
        endDate: queryParams.endDate,
        type: queryParams.type,
        gameType: queryParams.gameType,
        page: queryParams.page || 1
    },
    isUndefined
  )
  return queryConfig
}