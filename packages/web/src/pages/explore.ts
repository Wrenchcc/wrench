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

      {data.posts.edges.map(({ node }) => {
        {
          return (
            node.files
            && node.files.edges.map(file => (
              <img style={{ width: 500, height: 500 }} key={file.node.id} src={file.node.uri} />
            ))
          )
        }
      })}
    </div>
  )
}
