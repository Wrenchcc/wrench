import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Alert, Linking } from 'react-native'
import { compose } from 'react-apollo'
import withTranslation from 'i18n/withTranslation'
import { navigateToProject, navigateToUser } from 'navigation/actions'
import { deletePost } from 'graphql/mutations/post/deletePost'
import Avatar from 'ui/Avatar'
import Carousel from 'ui/Carousel'
import Comments from 'ui/Comments'
import LazyLoad from 'ui/LazyLoad'
import Title from 'ui/Title'
import Icon from 'ui/Icon'
import ActionSheet from 'ui/ActionSheet'
import { share } from 'images'
import { Top, Headline, Content, Caption } from './styled'

class Post extends PureComponent {
  state = {
    actionSheetIsOpen: false,
  }

  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    lazyload: PropTypes.bool,
    onPost: PropTypes.bool,
    post: PropTypes.object.isRequired,
  }

  toggleActionSheet = () => {
    this.setState(prevState => ({ actionSheetIsOpen: !prevState.actionSheetIsOpen }))
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
    const { t, post } = this.props

    const options = []

    if (post.postPermissions.isOwner) {
      options.push(
        {
          name: t('Post:options:edit'),
          onSelect: () => alert('edit'),
        },
        {
          name: t('Post:options:delete'),
          onSelect: this.onDelete,
        }
      )
    } else {
      options.push({
        name: t('Post:options:report'),
        onSelect: () => Linking.openURL(`mailto:report@wrench.cc?subject=Report%20post:%20${post.id}`),
      })
    }

    return (
      <ActionSheet
        isOpen={this.state.actionSheetIsOpen}
        onClose={this.toggleActionSheet}
        destructiveButtonIndex={options.length - 1}
        options={[...options, { name: t('Post:options:cancel') }]}
      />
    )
  }

  render() {
    const { post, onPost = false, lazyload } = this.props

    return (
      <LazyLoad enabled={lazyload}>
        <Top>
          <Avatar uri={post.user.avatarUrl} onPress={this.goToProfile} disabled={onPost} />
          <Icon source={share} onPress={this.toggleActionSheet} />
        </Top>

        <Content>
          {!onPost && (
            <Headline>
              <Title fontSize={19} numberOfLines={1} onPress={this.goToProject}>
                {post.project.title}
              </Title>
            </Headline>
          )}

          {post.caption && (
            <Caption
              onPress={this.goToProject}
              disabled={onPost}
              color={onPost ? 'dark' : 'grey'}
              fontSize={15}
              lineHeight={25}
            >
              {post.caption}
            </Caption>
          )}
          {post.files && <Carousel files={post.files} onPress={this.goToProject} />}
        </Content>

        {!post.project.commentsDisabled && <Comments data={post} />}

        {this.postActions()}
      </LazyLoad>
    )
  }
}

export default compose(
  deletePost,
  withTranslation('Post')
)(Post)
