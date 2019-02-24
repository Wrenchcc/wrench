import NextSeo from 'next-seo'
import { useQuery } from 'react-apollo-hooks'
import { GET_RECENT_POSTS } from '../graphql/queries/post/recentPosts'

export default function Explore() {
  const { data, error, loading } = useQuery(GET_RECENT_POSTS, {
    variables: { after: null },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }

  return (
    <div>
      <NextSeo
        config={{
          title: 'Explore • Wrench',
        }}
      />
      <h3>{data.posts.edges.map(({ node }) => node.caption)}</h3>
    </div>
  )
}
