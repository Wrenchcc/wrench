// @ts-nocheck
import React from 'react'
import { useTranslation } from 'i18n'
import { usePaginatedQuery, FollowersDocument } from '@wrench/common'
// import { Base } from './styles'

function Followers({ id }) {
  const { t } = useTranslation('Followers')
  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['followers'])(FollowersDocument, {
    variables: {
      projectId: id,
    },
  })

  return null
}

export default Followers
