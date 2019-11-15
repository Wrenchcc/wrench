// @ts-nocheck
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Seo from 'utils/seo'
import { PROJECT_BY_SLUG } from 'graphql/queries/project/projectBySlug'
import Follow from 'components/Follow'
import { Post, Title, Layout, Loader } from 'ui'
import UiButton from 'ui/Button'
import UiFollowers from 'ui/Followers'
import { DEVICE } from 'ui/constants'

const Left = styled.div`
  margin-right: 60px;
  max-width: 360px;
  position: fixed;

  @media ${DEVICE.TABLET} {
    margin-right: 0;
    max-width: 100%;
    position: static;
  }
`

const Right = styled.div`
  margin-left: 420px;
  width: 100%;

  @media ${DEVICE.TABLET} {
    margin-left: 0;
  }
`

const Share = styled(UiButton)`
  width: 220px;
`

const Followers = styled(UiFollowers)`
  margin-bottom: 50px;
`

function Project({ slug }) {
  const { t } = useTranslation()
  const { data, loading, fetchMore } = useQuery(PROJECT_BY_SLUG, {
    variables: { slug },
  })

  if (loading) {
    return null
  }

  return (
    <Layout>
      <Seo
        config={{
          title: t('project:title', { title: data.project.title, type: data.project.type.title }),
          description: t('project:description', {
            followers: data.project.followers.totalCount,
            posts: data.project.posts.totalCount,
            fullName: data.project.user.fullName,
            username: data.project.user.username,
          }),
        }}
      />

      <Left>
        <Title large lineHeight={78}>
          {data.project.title}
        </Title>

        <Followers followers={data.project.followers} />

        {!data.project.projectPermissions.isOwner && (
          <Follow following={data.project.projectPermissions.isFollower} />
        )}

        <Share>Share</Share>
      </Left>

      <Right>
        <InfiniteScroll
          loadMore={() =>
            fetchMore({
              variables: {
                after: data.project.posts.edges[data.project.posts.edges.length - 1].cursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev
                }

                return {
                  ...prev,
                  project: {
                    ...prev.project,
                    posts: {
                      ...prev.project.posts,
                      pageInfo: {
                        ...prev.project.posts.pageInfo,
                        ...fetchMoreResult.project.posts.pageInfo,
                      },
                      edges: [...prev.project.posts.edges, ...fetchMoreResult.project.posts.edges],
                    },
                  },
                }
              },
            })
          }
          hasMore={data.project.posts.pageInfo.hasNextPage}
          loader={<Loader key={0} />}
        >
          {data.project.posts.edges.map(({ node }) => (
            <Post data={node} key={node.id} withoutTitle />
          ))}
        </InfiniteScroll>
      </Right>
    </Layout>
  )
}

Project.getInitialProps = ({ query }) => query

export default Project
