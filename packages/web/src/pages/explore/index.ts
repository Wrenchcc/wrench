import { useQuery } from 'react-apollo-hooks'
import Seo from '../../utils/seo'
import { GET_RECENT_POSTS } from '../../graphql/queries/post/recentPosts'
import { Post, Layout } from '../../ui'

export default function Explore() {
  const { data, error, loading } = useQuery(GET_RECENT_POSTS, {
    variables: { after: null },
  })

  if (loading) {
    return null
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }

  return (
    <Layout>
      <Seo
        config={{
          title: 'Explore',
        }}
      />

      {data.posts.edges.map(({ node }) => (
        <Post data={node} key={node.id} />
      ))}
    </Layout>
  )
}
