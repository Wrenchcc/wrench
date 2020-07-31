// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import Seo from 'utils/seo'
import { USER_BY_USERNAME } from 'graphql/queries/user/userByUsername'
import UserFollowingProjects from 'components/UserFollowingProjects'
import { Text, Avatar, Layout, Post, Loader } from 'ui'
import UserProjects from 'components/UserProjects'
import { withHttp } from 'utils/url'
import { Top, Name, Left, Right, Info } from './styles'

function User({ username, isAuthenticated }) {
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
    <Layout
      top={
        <Top>
          <Avatar uri={data.user.avatarUrl} size={80} />
          <Name>
            <Text medium fontSize={36} lineHeight={38}>
              {data.user.fullName}
            </Text>

            {data.user.location || data.user.bio || data.user.website ? (
              <Info>
                {data.user.location && (
                  <Text color="grey" fontSize={15}>
                    {data.user.location}
                  </Text>
                )}

                {data.user.bio && (
                  <Text fontSize={15} style={{ marginTop: 5 }}>
                    {data.user.bio}
                  </Text>
                )}

                {data.user.website && (
                  <Text fontSize={15} style={{ marginTop: 5 }}>
                    <a rel="nofollow" href={withHttp(data.user.website)}>
                      {data.user.website}
                    </a>
                  </Text>
                )}
              </Info>
            ) : null}
          </Name>
        </Top>
      }
    >
      <Seo
        config={{
          title: t('user:title', params),
          description: t('user:description', params),
          openGraph: {
            title: t('user:title', params),
            description: t('user:description', params),
            url: `https://wrench.cc/${username}`,
            type: 'profile',
            profile: {
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              username,
            },
            images: [
              {
                url: `${data.user.avatarUrl}?w=160&h=160&dpr=1`,
                alt: t('user:imagealt'),
                width: 160,
                height: 160,
              },
            ],
          },
        }}
      />

      <Left>
        <InfiniteScroll
          loadMore={() =>
            fetchMore({
              variables: {
                after: data.user.posts.edges[data.user.posts.edges.length - 1].cursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev
                }

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
          loader={<Loader key={0} />}
        >
          {data.user.posts.edges.length ? (
            data.user.posts.edges.map(({ node }) => (
              <Post data={node} key={node.id} withoutAvatar />
            ))
          ) : (
            <UserFollowingProjects username={username} isAuthenticated={isAuthenticated} />
          )}
        </InfiniteScroll>
      </Left>

      {data.user.posts.edges.length > 0 && (
        <Right>
          <UserProjects projects={data.user.projects} />
        </Right>
      )}
    </Layout>
  )
}

User.getInitialProps = ({ query }) => query

export default User
