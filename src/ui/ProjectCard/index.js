import React from 'react'
import PropTypes from 'prop-types'
import { navigateToProfile } from 'navigation'
import { Gallery } from 'ui'
import { Base, Overlay, Content, Info, ProjectName, Followers, Avatar } from './styles'

const ProjectCard = ({ images, name, followers, onPress, user }) => (
  <Base onPress={onPress}>
    <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />

    <Gallery images={images} />

    <Content>
      <Info>
        <ProjectName numberOfLines={1} color="white">
          {name}
        </ProjectName>
        <Followers followers={followers} color="white" opacity={0.9} />
      </Info>
      <Avatar uri={user.avatarUrl} onPress={() => navigateToProfile({ user })} size={40} />
    </Content>
  </Base>
)

ProjectCard.propTypes = {
  images: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default ProjectCard
