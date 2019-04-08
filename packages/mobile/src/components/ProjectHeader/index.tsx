import React from 'react'
import PropTypes from 'prop-types'
import { Title } from 'ui'
import { useNavigation, SCREENS } from 'navigation'
import { Base, ProjectName, Followers } from './styles'

function ProjectHeader({ id, title, followers }) {
  const { navigate } = useNavigation()

  const navigateToFollowers = () => navigate(SCREENS.FOLLOWERS, {
    id,
  })

  return (
    <Base>
      <ProjectName>
        <Title large numberOfLines={0}>
          {title}
        </Title>
        <Followers followers={followers.totalCount} onPress={navigateToFollowers} />
      </ProjectName>
    </Base>
  )
}

ProjectHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  followers: PropTypes.object.isRequired,
}

export default ProjectHeader
