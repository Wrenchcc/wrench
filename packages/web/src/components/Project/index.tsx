// @ts-nocheck
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import Seo from 'utils/seo'
import { PROJECT_BY_SLUG } from 'graphql/queries/project/projectBySlug'
import { FOLLOW_PROJECT_MUTATION } from 'graphql/mutations/project/follow'
import Follow from 'components/Follow'
import Login from 'components/Login'
import Share from 'components/Share'
import SimilarProjects from 'components/SimilarProjects'
import { Modal, useModal } from 'ui/Modal'
import { Post, Title, Layout, Loader } from 'ui'
import { Left, Right, ShareButton, Similar, Followers } from './styles'

const ACTION = 'follow'

function Project({ slug, isAuthenticated, action }) {
  const { t } = useTranslation()
  const { data, loading, fetchMore } = useQuery(PROJECT_BY_SLUG, {
    variables: {
      slug,
    },
  })

  const [followProject] = useMutation(FOLLOW_PROJECT_MUTATION)

  const [showLoginModal, closeLoginModal] = useModal(
    () => (
      <Modal close={closeLoginModal}>
        <Login closeModal={closeLoginModal} referral={`/project/${slug}?action=${ACTION}`} />
      </Modal>
    ),
    [slug]
  )

  const [showSimilarModal, closeSimilarModal] = useModal(
    () => (
      <Modal large close={closeSimilarModal}>
        <SimilarProjects id={data.project.id} closeModal={closeSimilarModal} />
      </Modal>
    ),
    [data]
  )

  const [showShare, closeShareModal] = useModal(
    () => (
      <Modal close={closeShareModal}>
        <Share closeModal={closeShareModal} dynamicLink={data.project.dynamicLink} />
      </Modal>
    ),
    [data]
  )

  const toggleFollow = project => {
    if (!isAuthenticated) {
      showLoginModal()
      return
    }

    const totalCount = project.permissions.isFollower
      ? project.followers.totalCount - 1
      : project.followers.totalCount + 1

    const isFollower = !project.permissions.isFollower

    followProject({
      variables: {
        id: project.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        followProject: {
          id: project.id,
          ...project,
          followers: {
            ...project.followers,
            totalCount,
          },
          permissions: {
            ...project.permissions,
            isFollower,
          },
          __typename: 'Project',
        },
      },
    })
  }

  useEffect(() => {
    if (action === ACTION && !data.project.permissions.isFollower) {
      toggleFollow(data.project)
    }
  }, [action])

  if (loading) {
    return null
  }

  return (
    <Layout>
      <Seo
        config={{
          title: t('Project:title', { title: data.project.title, type: data.project.type.title }),
          description: t('Project:description', {
            followers: data.project.followers.totalCount,
            posts: data.project.posts.totalCount,
            fullName: data.project.user.fullName,
            username: data.project.user.username,
          }),
          openGraph: {
            title: t('Project:title', { title: data.project.title, type: data.project.type.title }),
            description: t('Project:description', {
              followers: data.project.followers.totalCount,
              posts: data.project.posts.totalCount,
              fullName: data.project.user.fullName,
              username: data.project.user.username,
            }),
            url: `https://wrench.cc/project/${slug}`,
            type: 'website',
            images: [
              {
                url: `${data.project.cover.uri}?w=650&h=650&dpr=1`,
                width: 640,
                height: 640,
              },
            ],
            site_name: 'Wrench',
          },
        }}
      />

      <Left>
        <Title large lineHeight={78}>
          {data.project.title}
        </Title>

        <Followers followers={data.project.followers} />

        {!data.project.permissions.isOwner && (
          <Follow
            following={data.project.permissions.isFollower}
            onPress={() => toggleFollow(data.project)}
          />
        )}

        <ShareButton onPress={showShare}>{t('Project:share')}</ShareButton>

        <Similar onPress={showSimilarModal}>{t('Project:similar')}</Similar>
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
                  Project: {
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
