import { useQuery } from 'react-apollo-hooks'
import Seo from '../../utils/seo'
import { PROJECT_BY_SLUG } from '../../graphql/queries/project/projectBySlug'
import { Post, Title, Followers } from '../../ui'
import splitString from '../../utils/splitString'

function Project({ slug }) {
  const { data, loading } = useQuery(PROJECT_BY_SLUG, {
    variables: { slug },
  })

  if (loading) {
    return null
  }

  const [first, second] = splitString(data.project.title)

  // <meta content="604 Likes, 4 Comments - Hookie Co. (@hookieco) on Instagram: “Bye bye 2018! The best comes last and were honoured to be on the TOP 10 customs of @bikeexif…”" name="description" />
  return (
    <div
      style={{
        paddingTop: '100px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <Seo
        config={{
          title: `${data.project.title} - ${data.project.type.title} Project`,
        }}
      />

      <Title large lineHeight={85}>
        {first}
        <br />
        {second}
      </Title>
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
