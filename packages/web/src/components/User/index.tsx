// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { usePaginatedQuery, UserDocument } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import Seo from 'utils/seo'
import UserFollowingProjects from 'components/UserFollowingProjects'
import { Text, Avatar, Layout, Post, Loader } from 'ui'
import UserProjects from 'components/UserProjects'
import { withHttp } from 'utils/url'
import { Inner, Top, Name, Left, Right, Info } from './styles'

function User({ username, isAuthenticated }) {
  const { t } = useTranslation()

  const {
    data: { edges, user },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['user', 'posts'])(UserDocument, {
    variables: {
      username,
    },
  })

  if (!user) {
    return null
  }

  const params = {
    fullName: user.fullName,
    username,
  }

  return (
    <Layout
      top={
        <Top>
          <Avatar uri={user.avatarUrl} size={80} />
          <Name>
            <Text medium fontSize={36} lineHeight={38}>
              {user.fullName}
            </Text>

            {user.location || user.bio || user.website ? (
              <Info>
                {user.location && (
                  <Text color="neutral" fontSize={15}>
                    {user.location}
                  </Text>
                )}

                {user.bio && (
                  <Text fontSize={15} style={{ marginTop: 5 }}>
                    {user.bio}
                  </Text>
                )}

                {user.website && (
                  <Text fontSize={15} style={{ marginTop: 5 }}>
                    <a rel="nofollow" href={withHttp(user.website)}>
                      {user.website}
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
              firstName: user.firstName,
              lastName: user.lastName,
              username,
            },
            images: [
              {
                url: `${user.avatarUrl}?w=160&h=160&dpr=1`,
                alt: t('user:imagealt'),
                width: 160,
                height: 160,
              },
            ],
          },
        }}
      />

      <Inner>
        <Left>
          <InfiniteScroll loadMore={fetchMore} hasMore={hasNextPage} loader={<Loader key={0} />}>
            {edges.length ? (
              edges.map(({ node }) => <Post data={node} key={node.id} withoutAvatar />)
            ) : (
              <UserFollowingProjects username={username} isAuthenticated={isAuthenticated} />
            )}
          </InfiniteScroll>
        </Left>

        {edges.length > 0 && (
          <Right>
            <UserProjects projects={user.projects} />
          </Right>
        )}
      </Inner>
    </Layout>
  )
}

User.getInitialProps = ({ query }) => query

export default User
