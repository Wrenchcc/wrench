import NextSeo from 'next-seo'
import { useQuery } from 'react-apollo-hooks'
import { USER_BY_USERNAME } from '../../graphql/queries/user/userByUsername'
import { Title, Avatar } from '../../ui'

function User({ username }) {
  const { data, loading } = useQuery(USER_BY_USERNAME, {
    variables: { username },
  })

  if (loading) {
    return null
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
          title: `${data.user.fullName} Profile`,
        }}
      />

      <Avatar uri={data.user.avatarUrl} size={80} />

      <Title medium>{data.user.fullName}</Title>
    </div>
  )
}

User.getInitialProps = ({ query }) => query

export default User
