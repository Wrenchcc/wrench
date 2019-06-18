import React, { Fragment, useCallback } from 'react'
import { Title } from 'ui'
import { useNavigation, SCREENS } from 'navigation'
import { Base, Followers } from './styles'

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
      <Fragment>
        <Title large numberOfLines={0}>
          {project.title}
        </Title>
        <Followers followers={project.followers.totalCount} onPress={handleNavigation} />
      </Fragment>
    </Base>
  )
}

export default Header
