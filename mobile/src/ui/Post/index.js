import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { compose } from 'react-apollo'
import { navigateToProject, navigateToUser } from 'navigation'
import { Avatar, Carousel, Comments, ActionSheet } from 'ui'
import { deletePost } from 'graphql/mutations/post/deletePost'
import { Base, Top, Title, Content, Caption } from './styled'

class Post extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    onPost: PropTypes.bool,
    avatar: PropTypes.bool,
  }

  state = {
    isOpen: false,
  }

  toggleActionSheet = () => {
    if (this.props.post.isAuthor) {
      this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    }
  }

  cancelDelete = () => {}

  deletePost = () => {
    const { id } = this.props.post
    this.props.deletePost(id)
  }

  goToProject = () => {
    const { project } = this.props.post
    if (!this.props.onPost) {
      navigateToProject({ project })
    }
  }

  goToProfile = () => {
    const { user } = this.props.post
    navigateToUser({ user })
  }

  render() {
    const { post, onPost = false, avatar = true } = this.props

    return (
      <Base onLongPress={this.toggleActionSheet} activeOpacity={1}>
        <Top>
          {!onPost && (
            <Title numberOfLines={1} onPress={this.goToProject}>
              {post.project.title}
            </Title>
          )}
          {avatar && (
            <Avatar uri={post.user.avatarUrl} onPress={this.goToProfile} disabled={onPost} />
          )}
        </Top>
        <Content>
          {post.caption && (
            <Caption onPress={this.goToProject} disabled={onPost} color="grey" lineHeight={25}>
              {post.caption}
            </Caption>
          )}
          {post.images && (
            <Carousel
              images={post.images}
              onPress={this.goToProject}
              onLongPress={this.toggleActionSheet}
            />
          )}
        </Content>

        <Comments data={post} />

        <ActionSheet
          isOpen={this.state.isOpen}
          onClose={this.toggleActionSheet}
          options={[
            {
              name: 'Delete post',
              onSelect: () => Alert.alert(
                'Are you sure?',
                null,
                [
                  { text: 'Delete', onPress: this.deletePost },
                  {
                    text: 'Cancel',
                    onPress: this.cancelDelete,
                    style: 'cancel',
                  },
                ],
                { cancelable: false }
              ),
            },
            { name: 'Cancel' },
          ]}
        />
      </Base>
    )
  }
}

export default compose(deletePost)(Post)
