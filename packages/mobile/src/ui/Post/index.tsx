import React from 'react'
import { useNavigation, SCREENS } from 'navigation'
import { useTranslation } from 'react-i18next'
import Avatar from 'ui/Avatar'
import Carousel from 'ui/Carousel'
import Comments from 'ui/Comments'
import Title from 'ui/Title'
import Text from 'ui/Text'
import Icon from 'ui/Icon'
import TimeAgo from 'ui/TimeAgo'
import { share } from 'images'
import LazyLoad from './blah'
// import EditPost from 'ui/EditPost'
// import ActionSheet from 'ui/ActionSheet'
// import { deletePost } from 'graphql-old/mutations/post/deletePost'
// import PropTypes from 'prop-types'
// import { Alert, Linking, Keyboard } from 'react-native'
import { Base, Top, Headline, Content, Spacer } from './styled'

function Post({ post, withoutTitle, withoutComments, disabled }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const navigateToProject = () => navigate(SCREENS.PROJECT, {
    slug: post.project.slug,
    postId: post.id,
  })

  return (
    <LazyLoad enabled>
      <Base>
        <Top>
          <Avatar
            uri={post.user.avatarUrl}
            disabled={disabled}
            onPress={() => navigate(SCREENS.USER, {
              id: post.user.id,
            })
            }
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

          <Text
            onPress={navigateToProject}
            disabled={withoutTitle}
            color={withoutTitle ? 'dark' : 'grey'}
            fontSize={15}
            lineHeight={22}
          >
            {post.caption}
          </Text>

          <Spacer />
          {post.files && <Carousel files={post.files} />}
        </Content>

        {!withoutComments && !post.project.commentsDisabled && <Comments data={post} />}
        <TimeAgo date={post.createdAt} fontSize={11} style={{ marginTop: 15 }} long />
      </Base>
    </LazyLoad>
  )
}

export default Post
