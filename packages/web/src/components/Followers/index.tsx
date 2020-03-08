// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, FollowersDocument } from '@wrench/common'
// import { Base } from './styles'

function Followers({ id }) {
  const { t } = useTranslation()
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

  console.log(edges)
  return null
}

export default Followers
