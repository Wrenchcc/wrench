import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from 'react-apollo-hooks'
import Seo from '../../utils/seo'
import { GET_RECENT_POSTS } from '../../graphql/queries/post/recentPosts'
import { Post, Layout } from '../../ui'
import { Title } from './styles'

export default function Explore() {
  const { data, loading, fetchMore } = useQuery(GET_RECENT_POSTS)

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

      <Title medium>Popular projects</Title>

      <Title medium>Recent posts & Articles</Title>
      <InfiniteScroll
        loadMore={() => fetchMore({
          variables: {
            after: data.posts.edges[data.posts.edges.length - 1].cursor,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev

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
        hasMore={data.posts.pageInfo.hasNextPage}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {data.posts.edges.map(({ node }) => (
          <Post data={node} key={node.id} />
        ))}
      </InfiniteScroll>
    </Layout>
  )
}
