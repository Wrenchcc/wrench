import { useQuery } from 'react-apollo-hooks'
import { useTranslation } from 'react-i18next'
import Seo from '../../utils/seo'
import { USER_BY_USERNAME } from '../../graphql/queries/user/userByUsername'
import { Title, Avatar } from '../../ui'

function User({ username }) {
  const { t } = useTranslation()
  const { data, loading } = useQuery(USER_BY_USERNAME, {
    variables: { username },
  })

  if (loading) {
    return null
  }

  const params = {
    fullName: data.user.fullName,
    username,
  }

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
          title: t('user:title', params),
          description: t('user:description', params),
          openGraph: {
            title: t('user:title', params),
            description: t('user:description', params),
            url: `https://wrench.cc/user/${username}`,
            type: 'profile',
            profile: {
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              username,
            },
            images: [
              {
                url: data.user.avatarUrl,
                alt: t('user:imagealt'),
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
