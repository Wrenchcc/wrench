import React, { useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useSimilarProjectsLazyQuery, useFollowProjectMutation } from '@wrench/common'
import { ActivityIndicator, Title, Follow, Icon } from 'ui'
import { arrowDown } from 'images'
import { useNavigation, SCREENS } from 'navigation'
import { FOLLOWING_COUNT, HAS_ASKED_FOR_RATING } from 'utils/storage/constants'
import { askForRating } from 'utils/rate'
import SimilarProjects from '../SimilarProjects'
import { Base, Actions, Followers, OpenSimilar } from './styles'

function ProjectHeader({ project, spacingHorizontal }) {
  const { navigate } = useNavigation()

  const [getSimilarProjects, { loading, data }] = useSimilarProjectsLazyQuery({
    variables: {
      id: project.id,
    },
  })

  const isFollower = !project.permissions.isFollower

  const handleSimilarProjects = useCallback(() => {
    getSimilarProjects()
  }, [getSimilarProjects])

  const [followProject] = useFollowProjectMutation({
    onCompleted: async () => {
      const [[, followingCount], [, hasAskedForRating]] = await AsyncStorage.multiGet([
        FOLLOWING_COUNT,
        HAS_ASKED_FOR_RATING,
      ])

      const count = JSON.parse(followingCount)

      if (count?.value > 2 && !hasAskedForRating) {
        askForRating()
        AsyncStorage.setItem(HAS_ASKED_FOR_RATING, 'true')
      }

      if (!hasAskedForRating) {
        AsyncStorage.setItem(FOLLOWING_COUNT, JSON.stringify({ value: count?.value + 1 }))
      }

      !isFollower && getSimilarProjects()
    },
  })

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
  }, [project])

  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.FOLLOWERS, {
        id: project.id,
      }),
    [project]
  )

  return (
    <Base spacingHorizontal={spacingHorizontal}>
      <Title large numberOfLines={0}>
        {project.title}
      </Title>

      <Followers followers={project.followers.totalCount} onPress={handleNavigation} />

      <Actions>
        {project.permissions && !project.permissions.isOwner && (
          <Follow following={project.permissions.isFollower} onPress={handleFollow} />
        )}

        <OpenSimilar onPress={handleSimilarProjects}>
          {loading ? <ActivityIndicator /> : <Icon source={arrowDown} disabled />}
        </OpenSimilar>
      </Actions>

      {data && data.similarProjects && <SimilarProjects projects={data.similarProjects} />}
    </Base>
  )
}

export default ProjectHeader
