// @ts-nocheck
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'i18n'
import Seo from 'utils/seo'
import {
  usePaginatedQuery,
  ProjectDocument,
  useFollowProjectMutation,
  CollectionsDocument,
} from '@wrench/common'
import Follow from 'components/Follow'
import Login from 'components/Login'
import Share from 'components/Share'
import SimilarProjects from 'components/SimilarProjects'
import Collections from 'components/Collections'
import { Modal, useModal } from 'ui/Modal'
import { Post, Title, Layout, Loader } from 'ui'
import { Left, Right, ShareButton, Similar, Followers } from './styles'

const ACTION = 'follow'

function Project({ slug, collection, isAuthenticated, action }) {
  const { t } = useTranslation('project')
  const {
    data: { edges: projectEdges, project },
    isFetching,
    fetchMore: fetchMorePosts,
    hasNextPage: hasNextPost,
  } = usePaginatedQuery(['project', 'posts'])(ProjectDocument, {
    skip: !collection,
    variables: {
      slug,
    },
  })

  const {
    data: { edges: collectionEdges },
    hasNextPage: hasNextCollection,
    fetchMore: fetchMoreCollections,
  } = usePaginatedQuery(['collections'])(CollectionsDocument, {
    skip: !collection,
    variables: {
      projectSlug: slug,
      slug: collection,
      first: 2,
    },
  })

  const [followProject] = useFollowProjectMutation()

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
        <SimilarProjects id={project.id} closeModal={closeSimilarModal} />
      </Modal>
    ),
    [project]
  )

  const [showShare, closeShareModal] = useModal(
    () => (
      <Modal close={closeShareModal}>
        <Share closeModal={closeShareModal} dynamicLink={project.dynamicLink} />
      </Modal>
    ),
    [project]
  )

  const toggleFollow = (project) => {
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
    if (action === ACTION && !project.permissions.isFollower) {
      toggleFollow(project)
    }
  }, [action])

  if (!project) {
    return null
  }

  return (
    <Layout>
      <Seo
        config={{
          title: t('title', { title: project.title, type: project?.type?.title }),
          description: t('description', {
            followers: project.followers.totalCount,
            posts: project?.posts?.totalCount || 0,
            fullName: project.user.fullName,
            username: project.user.username,
          }),
          openGraph: {
            title: t('title', { title: project.title, type: project?.type?.title }),
            description: t('description', {
              followers: project.followers.totalCount,
              posts: project?.posts?.totalCount || 0,
              fullName: project.user.fullName,
              username: project.user.username,
            }),
            url: `https://wrench.cc/project/${slug}`,
            type: 'website',
            images: [
              {
                url: `${project?.cover?.uri}?w=650&h=650&dpr=1`,
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
          {project?.title}
        </Title>

        <Followers followers={project.followers} project={project} />

        {!project.permissions.isOwner && (
          <Follow
            following={project.permissions.isFollower}
            onPress={() => toggleFollow(project)}
          />
        )}

        <ShareButton onPress={showShare}>{t('share')}</ShareButton>
        <Similar onPress={showSimilarModal}>{t('similar')}</Similar>
        <Collections />
      </Left>

      <Right>
        {collectionEdges?.length ? (
          <InfiniteScroll
            loadMore={fetchMoreCollections}
            hasMore={hasNextCollection}
            loader={<Loader key={0} />}
          >
            {collectionEdges?.map(({ node }) => (
              <Post data={node} key={node.id} withoutTitle />
            ))}
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            loadMore={fetchMorePosts}
            hasMore={hasNextPost}
            loader={<Loader key={0} />}
          >
            {projectEdges?.map(({ node }) => (
              <Post data={node} key={node.id} withoutTitle />
            ))}
          </InfiniteScroll>
        )}
      </Right>
    </Layout>
  )
}

Project.getInitialProps = ({ query }) => query

export default Project
