import React, { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-apollo-hooks'
import Seo from '../../utils/seo'
import { Post, Layout, Loader } from '../../ui'
import { GET_FEED } from '../../graphql/queries/feed/feed'
import { Left, Right } from './styles'

export default function Home() {
  const { t } = useTranslation()
  const { data, loading, fetchMore, error } = useQuery(GET_FEED)

  if (loading || error) {
    return null
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
        <InfiniteScroll
          loadMore={() => fetchMore({
            variables: {
              after: data.feed.posts.edges[data.feed.posts.edges.length - 1].cursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev

              return {
                ...prev,
                feed: {
                  ...prev.feed,
                  posts: {
                    ...prev.feed.posts,
                    pageInfo: {
                      ...prev.feed.posts.pageInfo,
                      ...fetchMoreResult.feed.posts.pageInfo,
                    },
                    edges: [...prev.feed.posts.edges, ...fetchMoreResult.feed.posts.edges],
                  },
                },
              }
            },
          })
          }
          hasMore={data.feed.posts.pageInfo.hasNextPage}
          loader={<Loader key={0} />}
        >
          {data.feed.posts.edges.map(({ node }) => (
            <Post data={node} key={node.id} />
          ))}
        </InfiniteScroll>
      </Left>
    </Layout>
  )
}
