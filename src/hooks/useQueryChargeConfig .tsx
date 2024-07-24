import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { ChargeHistoryConfig } from '@/types/bet.type'

export type QueryConfig = {
  [key in keyof ChargeHistoryConfig]: string
}

export default function useQueryChargeConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
        startDate: queryParams.startDate,
        endDate: queryParams.endDate,
        page: queryParams.page || 1
    },
    isUndefined
  )
  return queryConfig
}