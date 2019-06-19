import React, { useCallback } from 'react'
import { Title } from 'ui'
import { useNavigation, SCREENS } from 'navigation'
import { Base, Followers, Inner } from './styles'

function Header({ project, spacingHorizontal }) {
  const { navigate } = useNavigation()

  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.FOLLOWERS, {
        id: project.id,
      }),
    [project]
  )

  return (
    <Base spacingHorizontal={spacingHorizontal}>
      <Inner>
        <Title large numberOfLines={0}>
          {project.title}
        </Title>
        <Followers followers={project.followers.totalCount} onPress={handleNavigation} />
      </Inner>
    </Base>
  )
}

export default Header
