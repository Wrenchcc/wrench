import NextSeo from 'next-seo'
import { useQuery } from 'react-apollo-hooks'
import { GET_RECENT_POSTS } from '../../graphql/queries/post/recentPosts'
import { Post } from '../../ui'

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
    <div
      style={{
        paddingTop: '100px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <NextSeo
        config={{
          title: 'Explore • Wrench',
        }}
      />

      {data.posts.edges.map(({ node }) => (
        <Post data={node} key={node.id} />
      ))}
    </div>
  )
}
