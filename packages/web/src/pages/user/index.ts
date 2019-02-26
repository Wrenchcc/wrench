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
          title: `${data.user.fullName}. (@${username}) - projects and posts`,
          description: `See Wrench projects and posts from ${data.user.fullName}. (@${username})`,
          openGraph: {
            title: `${data.user.fullName}. (@${username}) - projects and posts`,
            description: `See Wrench projects and posts from ${data.user.fullName}. (@${username})`,
            url: `https://wrench.cc/user/${data.user.username}`,
            type: 'profile',
            profile: {
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              username,
            },
            images: [
              {
                url: data.user.avatarUrl,
                alt: 'Profile Photo',
              },
            ],
          },
        }}
      />
      <Avatar uri={data.user.avatarUrl} size={80} />
      <Title medium>{data.user.fullName}</Title>
    </div>
  )
}

User.getInitialProps = ({ query }) => query

export default User
