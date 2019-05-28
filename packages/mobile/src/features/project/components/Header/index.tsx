import React, { useCallback } from 'react'
import { Title } from 'ui'
import { useNavigation, SCREENS } from 'navigation'
import { Base, ProjectName, Followers } from './styles'

function Header({ project, spacingHorizontal }) {
  const { navigate } = useNavigation()

  const handleNavigation = useCallback(
    () => navigate(SCREENS.FOLLOWERS, {
      id: project.id,
    }),
    []
  )

  return (
    <Base spacingHorizontal={spacingHorizontal}>
      <ProjectName>
        <Title large numberOfLines={0}>
          {project.title}
        </Title>
        <Followers followers={project.followers.totalCount} onPress={handleNavigation} />
      </ProjectName>
    </Base>
  )
}

export default Header
