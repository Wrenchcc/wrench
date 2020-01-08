import React, { useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useSimilarProjectsLazyQuery } from '@wrench/common'
import { Title, Follow, Icon } from 'ui'
import { arrowDown } from 'images'
import { useNavigation, SCREENS } from 'navigation'
import SimilarProjects from '../SimilarProjects'
import { Base, Actions, Followers, OpenSimilar } from './styles'

function ProjectHeader({ project, spacingHorizontal, handleFollow }) {
  const { navigate } = useNavigation()
  const [getSimilarProjects, { loading, data }] = useSimilarProjectsLazyQuery({
    variables: {
      id: project.id,
    },
  })

  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.FOLLOWERS, {
        id: project.id,
      }),
    [project]
  )

  const handleSimilarProjects = useCallback(() => {
    getSimilarProjects()
  }, [getSimilarProjects])

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
          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Icon source={arrowDown} color="dark" disabled />
          )}
        </OpenSimilar>
      </Actions>

      {data && data.similarProjects && <SimilarProjects projects={data.similarProjects} />}
    </Base>
  )
}

export default ProjectHeader
