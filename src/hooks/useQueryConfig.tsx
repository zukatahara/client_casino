import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { BetHistoryConfig } from '@/types/bet.type'

export type QueryConfig = {
  [key in keyof BetHistoryConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
        startDate: queryParams.startDate,
        endDate: queryParams.endDate,
        type: queryParams.type,
        providercode: queryParams.providercode,
        gameType: queryParams.gameType,
        page: queryParams.page || 1
    },
    isUndefined
  )
  return queryConfig
}