import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Alert, TouchableOpacity } from 'react-native'
import { compose } from 'react-apollo'
import { withNamespaces } from 'react-i18next'
import { navigateToProject, navigateToUser } from 'navigation/actions'
import { deletePost } from 'graphql/mutations/post/deletePost'
import Avatar from 'ui/Avatar'
import Carousel from 'ui/Carousel'
import Comments from 'ui/Comments'
import ActionSheet from 'ui/ActionSheet'
import { Top, Title, Content, Caption } from './styled'

class Post extends PureComponent {
  state = {
    actionSheetIsOpen: false,
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    onPost: PropTypes.bool,
    avatar: PropTypes.bool,
  }

  toggleActionSheet = () => {
    if (this.props.post.postPermissions.isOwner) {
      this.setState(prevState => ({ actionSheetIsOpen: !prevState.actionSheetIsOpen }))
    }
  }

  deletePost = () => {
    const { id } = this.props.post
    this.props.deletePost(id)
  }

  goToProject = () => {
    const { project, id } = this.props.post
    if (!this.props.onPost) {
      navigateToProject({ project, id })
    }
  }

  goToProfile = () => {
    const { user } = this.props.post
    navigateToUser({ user })
  }

  onDelete = () => {
    const { t } = this.props

    Alert.alert(
      t('Post:options:alertTitle'),
      null,
      [
        {
          text: t('Post:options:delete'),
          onPress: this.deletePost,
          style: 'destructive',
        },
        {
          text: t('Post:options:cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    )
  }

  postActions() {
    const { t } = this.props

    return (
      <ActionSheet
        isOpen={this.state.actionSheetIsOpen}
        onClose={this.toggleActionSheet}
        destructiveButtonIndex={0}
        options={[
          {
            name: t('Post:options:delete'),
            onSelect: this.onDelete,
          },
          { name: t('Post:options:cancel') },
        ]}
      />
    )
  }

  render() {
    const { post, onPost = false, avatar = true } = this.props

    return (
      <TouchableOpacity onLongPress={this.toggleActionSheet} activeOpacity={1}>
        <Top>
          {!onPost && (
            <Title
              numberOfLines={1}
              onPress={this.goToProject}
              onLongPress={this.toggleActionSheet}
            >
              {post.project.title}
            </Title>
          )}
          {avatar && (
            <Avatar uri={post.user.avatarUrl} onPress={this.goToProfile} disabled={onPost} />
          )}
        </Top>
        <Content>
          {post.caption && (
            <Caption
              onLongPress={this.toggleActionSheet}
              onPress={this.goToProject}
              disabled={onPost}
              color="grey"
              lineHeight={25}
            >
              {post.caption}
            </Caption>
          )}
          {post.files && (
            <Carousel
              files={post.files}
              onPress={this.goToProject}
              onLongPress={this.toggleActionSheet}
            />
          )}
        </Content>

        {!post.project.commentsDisabled && <Comments data={post} />}

        {this.postActions()}
      </TouchableOpacity>
    )
  }
}

export default compose(
  deletePost,
  withNamespaces('Post')
)(Post)
