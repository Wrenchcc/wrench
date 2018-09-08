import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { Gallery } from 'ui'
import { followProject } from 'graphql/mutations/project/followProject'
import { Base, Overlay, Content, Info, ProjectName, Followers, Button } from './styles'

class ProjectCard extends PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    followers: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {
      t,
      images,
      title,
      id,
      followers,
      onPress,
      projectPermissions,
      user,
      style,
      followProject,
    } = this.props

    return (
      <Base onPress={onPress} style={style}>
        <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />

        {images && <Gallery images={images} />}

        <Content>
          <Info>
            <ProjectName numberOfLines={1} color="white">
              {title}
            </ProjectName>
            <Followers followers={followers.totalCount} color="white" opacity={0.9} />
          </Info>
          <Button small background="white" onPress={() => followProject(id)}>
            {projectPermissions.isFollower ? t('ProjectCard:unfollow') : t('ProjectCard:follow')}
          </Button>
        </Content>
      </Base>
    )
  }
}

export default compose(
  followProject,
  translate('ProjectCard')
)(ProjectCard)
