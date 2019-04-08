import React from 'react'
// import PropTypes from 'prop-types'
// import { Alert, Linking, Keyboard } from 'react-native'
import { compose } from 'react-apollo'
import { useNavigation, SCREENS } from 'navigation'
import withTranslation from 'i18n/withTranslation'
import { deletePost } from 'graphql-old/mutations/post/deletePost'
import Avatar from 'ui/Avatar'
import Carousel from 'ui/Carousel'
import Comments from 'ui/Comments'
import Title from 'ui/Title'
import Text from 'ui/Text'
import Icon from 'ui/Icon'
import TimeAgo from 'ui/TimeAgo'
// import ActionSheet from 'ui/ActionSheet'
import { share } from 'images'
import EditPost from 'ui/EditPost'
import Touchable from 'ui/Touchable'
import { Top, Headline, Content, Spacer } from './styled'

function Post({ post, withoutTitle, withoutComments, disabled }) {
  const { navigate } = useNavigation()

  const navigateToUser = () => navigate(SCREENS.USER, {
    id: post.user.id,
  })

  const navigateToProject = () => navigate(SCREENS.PROJECT, {
    slug: post.project.slug,
    postId: post.id,
  })

  return (
    <>
      <Top>
        <Avatar
          uri={post.user.avatarUrl}
          disabled={disabled}
          onPress={navigateToUser}
          isOnline={post.user.isOnline}
        />
        <Icon source={share} onPress={this.toggleActionSheet} hitSlop={20} />
      </Top>
      <Content>
        {!withoutTitle && post.project.title && (
          <Headline>
            <Title fontSize={19} numberOfLines={1} onPress={navigateToProject}>
              {post.project.title}
            </Title>
          </Headline>
        )}

        {false ? (
          <EditPost
            post={post}
            color={withoutTitle ? 'dark' : 'grey'}
            onSubmit={this.toggleEdit}
            hasChanged={hasChanged => this.setState({ hasChanged })}
          />
        ) : (
          <Text
            onPress={navigateToProject}
            disabled={withoutTitle}
            color={withoutTitle ? 'dark' : 'grey'}
            fontSize={15}
            lineHeight={22}
          >
            {post.caption}
          </Text>
        )}

        <Spacer />

        {post.files && (
          <Touchable onPress={navigateToProject} disabled={disabled} activeOpacity={1}>
            <Carousel files={post.files} />
          </Touchable>
        )}
      </Content>
      {!withoutComments && <>{!post.project.commentsDisabled && <Comments data={post} />}</>}
      <TimeAgo date={post.createdAt} fontSize={11} style={{ marginTop: 15 }} long />
    </>
  )
}

export default compose(
  deletePost,
  withTranslation('Post')
)(Post)
