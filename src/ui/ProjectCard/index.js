import React from 'react'
import PropTypes from 'prop-types'
import { navigateToProfile } from 'navigation'
import { Base, Picture, Overlay, Content, Info, ProjectName, Followers, Avatar } from './styles'

const ProjectCard = ({ coverUri, name, followers, onPress, user }) => (
  <Base onPress={onPress}>
    <Picture source={{ uri: coverUri }} />
    <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />

    <Content>
      <Info>
        <ProjectName numberOfLines={1} color="white">
          {name}
        </ProjectName>
        <Followers followers={followers} color="white" />
      </Info>
      <Avatar uri={user.avatarUrl} onPress={() => navigateToProfile({ user })} />
    </Content>
  </Base>
)

ProjectCard.propTypes = {
  coverUri: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default ProjectCard
