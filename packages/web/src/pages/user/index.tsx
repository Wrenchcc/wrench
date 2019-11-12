// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import Seo from '../../utils/seo'
import { USER_BY_USERNAME } from '../../graphql/queries/user/userByUsername'
import { Text, Avatar, Layout, Post, Loader } from '../../ui'
import UserProjects from '../../components/UserProjects'
import styled from 'styled-components'

const Top = styled.div`
  display: flex;
  margin-bottom: 65px;
`

const Name = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`

const Left = styled.div`
  margin-right: 155px;
  max-width: 640px;
  width: 100%;
`

const Right = styled.div`
  margin-top: -120px;
`

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
    <Layout
      top={
        <Top>
          <Avatar uri={data.user.avatarUrl} size={80} />
          <Name>
            <Text medium fontSize={36} lineHeight={38}>
              {data.user.firstName}
            </Text>
            <Text medium fontSize={36} lineHeight={38}>
              {data.user.lastName}
            </Text>
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
          {data.user.posts.edges.map(({ node }) => (
            <Post data={node} key={node.id} withoutAvatar />
          ))}
        </InfiniteScroll>
      </Left>

      {data.user.projects && (
        <Right>
          <UserProjects projects={data.user.projects} fullName={data.user.firstName} />
        </Right>
      )}
    </Layout>
  )
}

User.getInitialProps = ({ query }) => query

export default User
