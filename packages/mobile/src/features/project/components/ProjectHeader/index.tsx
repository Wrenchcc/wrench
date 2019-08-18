import React, { useCallback } from 'react'
import { Title, Follow } from 'ui'
import { useNavigation, SCREENS } from 'navigation'
import { followProject } from 'graphql/mutations/project/followProject'
import { Base, Actions, Followers } from './styles'

function ProjectHeader({ project, spacingHorizontal, followProject: followProjectMutation }) {
  const { navigate } = useNavigation()

  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.FOLLOWERS, {
        id: project.id,
      }),
    [project]
  )

  const handleFollow = useCallback(() => followProjectMutation(project.id), [project])

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
      </Actions>
    </Base>
  )
}

export default followProject(ProjectHeader)
