import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, FOLLOW_PROJECT_MUTATION } from 'gql'
import { track, events } from 'utils/analytics'
import { useNavigation, SCREENS } from 'navigation'
import { Title, InfiniteList, CardSmall } from 'ui'
import { Base, Follow, SNAP_INTERVAL } from './styles'

function SimilarProjects({ projects }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const [toggleFollow] = useMutation(FOLLOW_PROJECT_MUTATION)

  const renderItem = ({ item }) => {
    const project = item.node
    const id = item.node.id

    const handleNavigation = () => {
      navigate(SCREENS.PROJECT, {
        id,
        project,
      })
    }

    const handletoggleFollow = () => {
      const isFollower = !project.permissions.isFollower
      const totalCount = project.permissions.isFollower
        ? project.followers.totalCount - 1
        : project.followers.totalCount + 1

      track(isFollower ? events.PROJECT_FOLLOWED : events.PROJECT_UNFOLLOWED)

      toggleFollow({
        variables: {
          id,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          followProject: {
            id,
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

    return (
      <CardSmall
        key={id}
        onPress={handleNavigation}
        title={project.title}
        followers={project.followers.totalCount}
        image={project.cover}
        style={{
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        {project.permissions && !project.permissions.isOwner && (
          <Follow small following={project.permissions.isFollower} onPress={handletoggleFollow} />
        )}
      </CardSmall>
    )
  }

  return (
    <Base>
      <Title style={{ marginBottom: 20 }}>{t('SimilarProjects:title')}</Title>

      <InfiniteList
        initialNumToRender={3}
        data={projects.edges}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          marginLeft: -25,
          marginRight: -25,
        }}
      />
    </Base>
  )
}

export default SimilarProjects
