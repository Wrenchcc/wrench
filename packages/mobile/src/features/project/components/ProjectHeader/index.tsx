import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useSimilarProjectsLazyQuery, useFollowProjectMutation } from '@wrench/common'
import { ActivityIndicator, Title, Follow, Icon, UserStack } from 'ui'
import { arrowDown, arrowUp } from 'images'
import { useNavigation, SCREENS } from 'navigation'
import { FOLLOWING_COUNT, HAS_ASKED_FOR_RATING } from 'utils/storage/constants'
import { askForRating } from 'utils/rate'
import SimilarProjects from '../SimilarProjects'
// import Collections from '../Collections'
import { Base, Meta, Actions, Followers, OpenSimilar, Spacing } from './styles'

const TRIGGER_RATING_COUNT = 3

function ProjectHeader({ project, spacingHorizontal }) {
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

  const [followProject] = useFollowProjectMutation({
    onCompleted: async () => {
      const [[, followingCount], [, hasAskedForRating]] = await AsyncStorage.multiGet([
        FOLLOWING_COUNT,
        HAS_ASKED_FOR_RATING,
      ])

      const count = JSON.parse(followingCount)

      if (count?.value === TRIGGER_RATING_COUNT && !hasAskedForRating) {
        askForRating()
        AsyncStorage.setItem(HAS_ASKED_FOR_RATING, 'true')
      }

      if (!hasAskedForRating) {
        AsyncStorage.setItem(FOLLOWING_COUNT, JSON.stringify({ value: count?.value + 1 }))
      }
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
    <Base spacingHorizontal={spacingHorizontal}>
      <Title large numberOfLines={0}>
        {project.title}
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
          <OpenSimilar onPress={handleSimilarProjects}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Icon source={isShowingSimilarProjects ? arrowUp : arrowDown} disabled />
            )}
          </OpenSimilar>
        )}
      </Actions>

      {data && data.similarProjects && isShowingSimilarProjects && (
        <SimilarProjects projects={data.similarProjects} />
      )}

      {!isOwner && <Spacing />}

      {/* <Collections isOwner={isOwner} projectId={project.id} /> */}
    </Base>
  )
}

export default ProjectHeader
