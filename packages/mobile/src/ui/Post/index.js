import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Alert, Linking, Keyboard } from 'react-native'
import { compose } from 'react-apollo'
import withTranslation from 'i18n/withTranslation'
import { navigateToProject, navigateToUser } from 'navigation/actions'
import { deletePost } from 'graphql/mutations/post/deletePost'
import Avatar from 'ui/Avatar'
import Carousel from 'ui/Carousel'
import Comments from 'ui/Comments'
import LazyLoad from 'ui/LazyLoad'
import Title from 'ui/Title'
import Text from 'ui/Text'
import Icon from 'ui/Icon'
import TimeAgo from 'ui/TimeAgo'
import ActionSheet from 'ui/ActionSheet'
import { share } from 'images'
import EditPost from 'ui/EditPost'
import { Top, Headline, Content, Spacer } from './styled'

class Post extends PureComponent {
  state = {
    actionSheetIsOpen: false,
    alertOpen: false,
    isEditing: false,
    hasChanged: false,
  }

  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    lazyload: PropTypes.bool,
    post: PropTypes.object.isRequired,
    withoutComments: PropTypes.bool,
    withoutTitle: PropTypes.bool,
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove()
  }

  toggleActionSheet = () => {
    this.setState(prevState => ({ actionSheetIsOpen: !prevState.actionSheetIsOpen }))
  }

  toggleEdit = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }))
  }

  deletePost = () => {
    const { id } = this.props.post
    this.props.deletePost(id)
  }

  goToProject = () => {
    const { project, id } = this.props.post
    if (!this.props.withoutTitle) {
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

  keyboardDidHide = () => {
    const { t } = this.props

    if (this.state.hasChanged && this.state.isEditing && !this.state.alertOpen) {
      this.setState({ alertOpen: true })

      Alert.alert(
        t('Post:options:alertTitle'),
        t('Post:options:alertDescription'),
        [
          {
            text: t('Post:options:discard'),
            onPress: () => {
              this.setState({ isEditing: false })
              this.setState({ alertOpen: false })
            },
            style: 'destructive',
          },
          {
            text: t('Post:options:cancel'),
            onPress: () => {
              this.setState({ alertOpen: false })
            },
            style: 'cancel',
          },
        ],
        { cancelable: false }
      )
    } else if (!this.state.hasChanged) {
      this.setState({ isEditing: false })
      this.setState({ alertOpen: false })
    }
  }

  postActions() {
    const { t, post } = this.props

    const options = []

    if (post.postPermissions.isOwner) {
      options.push(
        {
          name: t('Post:options:edit'),
          onSelect: this.toggleEdit,
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
    const { post, withoutTitle, lazyload, withoutComments } = this.props

    return (
      <LazyLoad enabled={lazyload}>
        <Top>
          <Avatar
            uri={post.user.avatarUrl}
            onPress={this.goToProfile}
            isOnline={post.user.isOnline}
          />
          <Icon source={share} onPress={this.toggleActionSheet} hitSlop={20} />
        </Top>

        <Content>
          {!withoutTitle && post.project.title && (
            <Headline>
              <Title fontSize={19} numberOfLines={1} onPress={this.goToProject}>
                {post.project.title}
              </Title>
            </Headline>
          )}

          {this.state.isEditing ? (
            <EditPost
              post={post}
              color={withoutTitle ? 'dark' : 'grey'}
              onSubmit={this.toggleEdit}
              hasChanged={hasChanged => this.setState({ hasChanged })}
            />
          ) : (
            <Text
              onPress={this.goToProject}
              disabled={withoutTitle}
              color={withoutTitle ? 'dark' : 'grey'}
              fontSize={15}
              lineHeight={22}
            >
              {post.caption}
            </Text>
          )}

          <Spacer />

          {post.files && <Carousel files={post.files} onPress={this.goToProject} />}
        </Content>

        {!withoutComments && (
          <>
            {!post.project.commentsDisabled && <Comments data={post} />}
            <TimeAgo date={post.createdAt} fontSize={11} style={{ marginTop: 15 }} long />
          </>
        )}
        {!this.state.isEditing && this.postActions()}
      </LazyLoad>
    )
  }
}

export default compose(
  deletePost,
  withTranslation('Post')
)(Post)
