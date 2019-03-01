import React, { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from 'react-apollo-hooks'
import Seo from '../utils/seo'
import { Post, Layout } from '../ui'
import { GET_FEED } from '../graphql/queries/feed/feed'

export default function Home() {
  const { data, loading, fetchMore, error } = useQuery(GET_FEED)

  if (loading || error) {
    return null
  }

  return (
    <Layout>
      <Seo
        config={
          {
            // title: t('feed:title', { title: data.feed.title, type: data.feed.type.title }),
            // description: t('feed:description', {
            //   followers: data.feed.followers.totalCount,
            //   posts: data.feed.posts.totalCount,
            //   fullName: data.feed.user.fullName,
            //   username: data.feed.user.username,
            // }),
          }
        }
      />

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
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {data.feed.posts.edges.map(({ node }) => (
          <Post data={node} key={node.id} withoutTitle />
        ))}
      </InfiniteScroll>
    </Layout>
  )
}
