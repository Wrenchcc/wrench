import NextSeo from 'next-seo'
import { useQuery } from 'react-apollo-hooks'
import { PROJECT_BY_SLUG } from '../../graphql/queries/project/projectBySlug'
import { Post, Title, Followers } from '../../ui'
import splitString from '../../utils/splitString'

function Project({ slug }) {
  const { data, loading } = useQuery(PROJECT_BY_SLUG, {
    variables: { slug },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  const [first, second] = splitString(data.project.title)

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
          title: `${data.project.title} • Wrench`,
        }}
      />
      <Title large>{first}</Title>
      <Title large>{second}</Title>
      <Followers count={data.project.followers.totalCount} />

      <div style={{ marginTop: 80 }}>
        {data.project.posts.edges.map(({ node }) => (
          <Post data={node} key={node.id} onPost />
        ))}
      </div>
    </div>
  )
}

Project.getInitialProps = ({ query }) => query

export default Project
