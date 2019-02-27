import { useQuery } from 'react-apollo-hooks'
import { useTranslation } from 'react-i18next'
import Seo from '../../utils/seo'
import { PROJECT_BY_SLUG } from '../../graphql/queries/project/projectBySlug'
import { Post, Title, Followers, Layout } from '../../ui'
import splitString from '../../utils/splitString'

function Project({ slug }) {
  const { t } = useTranslation()
  const { data, loading } = useQuery(PROJECT_BY_SLUG, {
    variables: { slug },
  })

  if (loading) {
    return null
  }

  const [first, second] = splitString(data.project.title)

  return (
    <Layout>
      <Seo
        config={{
          title: t('project:title', { title: data.project.title, type: data.project.type.title }),
          description: t('project:description', {
            followers: data.project.followers.totalCount,
            posts: 3000,
            fullName: data.project.user.fullName,
            username: data.project.user.username,
          }),
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
    </Layout>
  )
}

Project.getInitialProps = ({ query }) => query

export default Project
