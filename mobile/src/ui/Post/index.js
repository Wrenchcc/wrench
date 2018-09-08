import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { navigateToProject, navigateToUser } from 'navigation'
import { Avatar, Carousel, Comments } from 'ui'
import { Base, Top, Title, Content, Caption } from './styled'

export default class Post extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onPost: PropTypes.bool,
    avatar: PropTypes.bool,
  }

  goToProject = () => {
    const { project } = this.props.data
    if (!this.props.onPost) {
      navigateToProject({ project })
    }
  }

  goToProfile = () => {
    const { user } = this.props.data
    navigateToUser({ user })
  }

  render() {
    const { data, onPost = false, avatar = true } = this.props

    return (
      <Base>
        <Top>
          {!onPost && (
            <Title numberOfLines={1} onPress={this.goToProject}>
              {data.project.title}
            </Title>
          )}
          {avatar && (
            <Avatar uri={data.user.avatarUrl} onPress={this.goToProfile} disabled={onPost} />
          )}
        </Top>
        <Content>
          {data.caption && (
            <Caption onPress={this.goToProject} disabled={onPost} color="grey" lineHeight={25}>
              {data.caption}
            </Caption>
          )}
          {data.images && <Carousel images={data.images} onPress={this.goToProject} />}
        </Content>

        <Comments data={data} />
      </Base>
    )
  }
}
