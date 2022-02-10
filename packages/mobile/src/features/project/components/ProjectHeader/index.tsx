import React, { useCallback, useState } from 'react'
import { AnimatePresence } from 'moti'
import { useSimilarProjectsLazyQuery, useFollowProjectMutation } from '@wrench/common'
import * as Spacing from 'ui/Spacing'
import { ActivityIndicator, Title, Follow, Icon, UserStack } from 'ui'
import { arrowDown, arrowUp } from 'images'
import { useNavigation, SCREENS } from 'navigation'
import SimilarProjects from '../SimilarProjects'
import Collections from '../Collections'
import { Base, Meta, Actions, Followers, OpenSimilar } from './styles'

function ProjectHeader({ project }) {
  const { navigate } = useNavigation()
  const [isShowingSimilarProjects, setIsShowingSimilarProjects] = useState(false)

  const [getSimilarProjects, { loading, data }] = useSimilarProjectsLazyQuery({
    variables: {
      id: project.id,
    },
  })

  const isFollower = !project.permissions.isFollower
  const isOwner = project?.permissions.isOwner

  const handleSimilarProjects = useCallback(() => {
    if (!isShowingSimilarProjects && (!data || !data.similarProjects)) {
      getSimilarProjects()
      setIsShowingSimilarProjects(true)
    }

    if (!isShowingSimilarProjects && data && data.similarProjects) {
      setIsShowingSimilarProjects(true)
    }

    if (isShowingSimilarProjects) {
      setIsShowingSimilarProjects(false)
    }
  }, [isShowingSimilarProjects, getSimilarProjects])

  const [followProject] = useFollowProjectMutation()

  const handleFollow = useCallback(() => {
    const totalCount = project.permissions.isFollower
      ? project.followers.totalCount - 1
      : project.followers.totalCount + 1

    followProject({
      variables: {
        id: project.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        followProject: {
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

    if (!project.permissions.isFollower) {
      getSimilarProjects()
      setIsShowingSimilarProjects(true)
    }
  }, [project])

  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.FOLLOWERS, {
        id: project.id,
      }),
    [project]
  )

  return (
    <Base>
      <Title large numberOfLines={0}>
        {project?.title}
      </Title>

      <Meta>
        {project.followers.edges.length > 2 && (
          <UserStack users={project.followers.edges} onPress={handleNavigation} size={30} />
        )}

        <Followers followers={project.followers.totalCount} onPress={handleNavigation} />
      </Meta>

      <Actions>
        {!isOwner && <Follow following={project.permissions.isFollower} onPress={handleFollow} />}

        {!isOwner && (
          <OpenSimilar>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Icon
                source={isShowingSimilarProjects ? arrowUp : arrowDown}
                onPress={handleSimilarProjects}
              />
            )}
          </OpenSimilar>
        )}
      </Actions>

      <AnimatePresence>
        {data && data.similarProjects && isShowingSimilarProjects && (
          <SimilarProjects projects={data.similarProjects} />
        )}
      </AnimatePresence>

      {!isOwner && <Spacing.Horizontally px={30} />}

      <Collections isOwner={isOwner} projectId={project.id} />
    </Base>
  )
}

export default React.memo(ProjectHeader)
