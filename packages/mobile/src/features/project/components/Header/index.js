import React from 'react'
import PropTypes from 'prop-types'
import { Title } from 'ui'
import { useNavigation, SCREENS } from 'navigation'
import { Base, ProjectName, Followers } from './styles'

function Header({ project }) {
  const { navigate } = useNavigation()

  const navigateToFollowers = () => navigate(SCREENS.FOLLOWERS, {
    id: project.id,
  })

  return (
    <Base>
      <ProjectName>
        <Title large numberOfLines={0}>
          {project.title}
        </Title>
        <Followers followers={project.followers.totalCount} onPress={navigateToFollowers} />
      </ProjectName>
    </Base>
  )
}

Header.propTypes = {
  project: PropTypes.object.isRequired,
}

export default Header
