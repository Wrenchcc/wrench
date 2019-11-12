// @ts-nocheck
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import Seo from '../../utils/seo'
import { GET_EXPLORE } from '../../graphql/queries/explore/explore'
import { Post, Layout, Loader } from '../../ui'
import UiTitle from '../../ui/Title'
import Popular from '../../components/Popular'

const Title = styled(UiTitle)`
  margin-bottom: 50px;
`

export default function Explore() {
  const { data, loading, fetchMore } = useQuery(GET_EXPLORE, {
    variables: {
      first: 4,
    },
  })

  if (loading) {
    return null
  }

  return (
    <Layout column>
      <Seo
        config={{
          title: 'Explore',
        }}
      />

      <Popular projects={data.projects} />

      <Title medium>Recent posts</Title>
      <InfiniteScroll
        loadMore={() =>
          fetchMore({
            variables: {
              after: data.posts.edges[data.posts.edges.length - 1].cursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev
              }

              return {
                ...prev,
                posts: {
                  ...prev.posts,
                  pageInfo: {
                    ...prev.posts.pageInfo,
                    ...fetchMoreResult.posts.pageInfo,
                  },
                  edges: [...prev.posts.edges, ...fetchMoreResult.posts.edges],
                },
              }
            },
          })
        }
        hasMore={data.posts && data.posts.pageInfo.hasNextPage}
        loader={<Loader key={0} />}
      >
        {data.posts && data.posts.edges.map(({ node }) => <Post data={node} key={node.id} />)}
      </InfiniteScroll>
    </Layout>
  )
}
