import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { navigateToProfile } from 'navigation'
import { Gallery } from 'ui'
import { Base, Overlay, Content, Info, ProjectName, Followers, Avatar } from './styles'

export default class ProjectCard extends PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    followers: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  goToProfile = () => {
    const { user } = this.props
    navigateToProfile({ user })
  }

  render() {
    const { images, title, followers, onPress, user } = this.props

    return (
      <Base onPress={onPress}>
        <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />

        {images && <Gallery images={images} />}

        <Content>
          <Info>
            <ProjectName numberOfLines={1} color="white">
              {title}
            </ProjectName>
            <Followers followers={followers.totalCount} color="white" opacity={0.9} />
          </Info>
          <Avatar uri={user.avatarUrl} onPress={this.goToProfile} size={40} />
        </Content>
      </Base>
    )
  }
}
