import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { navigateToProject, navigateToProfile } from 'navigation'
import { Media, Comments, Avatar } from 'ui'
import { Base, Top, Content, Title } from './styled'

export default class Post extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onLongPress: PropTypes.func,
    onPost: PropTypes.bool,
    avatar: PropTypes.bool,
  }

  goToProject = () => {
    const { id, user, project } = this.props.data
    if (!this.props.onPost) {
      navigateToProject({ id, user, project })
    }
  }

  goToProfile = () => {
    const { user } = this.props.data
    navigateToProfile({ user })
  }

  render() {
    const { data, onPost = false, avatar = true, onLongPress } = this.props
    return (
      <Base>
        <Top>
          {!onPost && (
            <Title numberOfLines={1} onPress={this.goToProject}>
              {data.project.name}
            </Title>
          )}
          {avatar && (
            <Avatar uri={data.user.avatarUrl} onPress={this.goToProfile} disabled={onPost} />
          )}
        </Top>
        <Content>
          <Media onLongPress={onLongPress} post={data} onPress={this.goToProject} />
        </Content>

        <Comments data={data.comments} />
      </Base>
    )
  }
}
