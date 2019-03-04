import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from 'react-apollo-hooks'
import { useTranslation } from 'react-i18next'
import Seo from '../../utils/seo'
import { USER_BY_USERNAME } from '../../graphql/queries/user/userByUsername'
import { Title, Avatar, Layout, Post } from '../../ui'

function User({ username }) {
  const { t } = useTranslation()
  const { data, loading, fetchMore } = useQuery(USER_BY_USERNAME, {
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
    <Layout column>
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

      <InfiniteScroll
        loadMore={() => fetchMore({
          variables: {
            after: data.user.posts.edges[data.user.posts.edges.length - 1].cursor,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev

            return {
              ...prev,
              user: {
                ...prev.user,
                posts: {
                  ...prev.user.posts,
                  pageInfo: {
                    ...prev.user.posts.pageInfo,
                    ...fetchMoreResult.user.posts.pageInfo,
                  },
                  edges: [...prev.user.posts.edges, ...fetchMoreResult.user.posts.edges],
                },
              },
            }
          },
        })
        }
        hasMore={data.user.posts.pageInfo.hasNextPage}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {data.user.posts.edges.map(({ node }) => (
          <Post data={node} key={node.id} withoutAvatar />
        ))}
      </InfiniteScroll>
    </Layout>
  )
}

User.getInitialProps = ({ query }) => query

export default User
