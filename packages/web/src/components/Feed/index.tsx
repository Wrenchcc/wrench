// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'react-i18next'
import { useCurrentUserQuery, usePaginatedQuery, FeedDocument } from '@wrench/common'
import Seo from 'utils/seo'
import { Post, Layout, Loader } from 'ui'
import FollowingProjects from 'components/FollowingProjects'
import { GET_FEED } from 'graphql/queries/feed/feed'
import Onboarding from 'components/Onboarding'
import ProjectSuggestion from 'components/ProjectSuggestion'
import { Left, Right } from './styles'

export default function Home() {
  const { t } = useTranslation()
  const { data } = useCurrentUserQuery()

  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['feed', 'posts'])(FeedDocument, {
    pollInterval: 3000,
    variables: {
      first: 3,
    },
  })

  if (!data?.user?.interestedIn.length) {
    return <Onboarding />
  }

  if (!edges?.length) {
    return <ProjectSuggestion />
  }

  return (
    <Layout>
      <Seo
        config={{
          title: t('feed:title'),
          description: t('feed:description'),
        }}
      />

      <Left>
        <InfiniteScroll loadMore={fetchMore} hasMore={hasNextPage} loader={<Loader key={0} />}>
          {edges?.map(({ node }) => (
            <Post data={node} key={node.id} />
          ))}
        </InfiniteScroll>
      </Left>

      <Right>
        <FollowingProjects />
      </Right>
    </Layout>
  )
}
