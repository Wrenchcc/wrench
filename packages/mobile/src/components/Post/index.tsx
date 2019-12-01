import React, { useCallback } from 'react'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useNavigation, showEditPost, SCREENS } from 'navigation'
import openLink from 'utils/openLink'
import { deletePost } from 'graphql/mutations/post/deletePost'
import { Avatar, Carousel, Comments, Title, Text, Icon, TimeAgo } from 'ui'
import LikePost from 'components/LikePost'
import { share } from 'images'
import { Base, Top, Headline, Content, Spacer } from './styles'

function Post({
  post,
  withoutTitle,
  withoutComments,
  deletePost: deletePostMutation,
  paddingBottom,
  numberOfLines = 3,
}) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const handleEdit = useCallback(
    () =>
      showEditPost({
        id: post.id,
      }),
    [post]
  )

  const { showActionSheetWithOptions } = useActionSheet()

  const navigateToProject = useCallback(() => {
    if (!withoutTitle) {
      navigate(SCREENS.PROJECT, {
        id: post.project.id,
        post,
        postId: post.id,
        project: post.project,
      })
    }
  }, [post, withoutTitle])

  const navigateToUser = useCallback(() => {
    navigate(SCREENS.USER, {
      user: post.user,
    })
  }, [post])

  const onDelete = useCallback(() => {
    Alert.alert(
      t('Post:options:alertTitle'),
      null,
      [
        {
          onPress: () => deletePostMutation(post.id),
          style: 'destructive',
          text: t('Post:options:delete'),
        },
        {
          style: 'cancel',
          text: t('Post:options:cancel'),
        },
      ],
      { cancelable: false }
    )
  }, [post])

  const handleActionSheet = useCallback(() => {
    if (post.permissions.isOwner) {
      const options = [t('Post:options:edit'), t('Post:options:delete'), t('Post:options:cancel')]
      showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
          tintColor: 'black',
        },
        index => {
          if (index === 0) {
            handleEdit()
          }
          if (index === 1) {
            onDelete()
          }
        }
      )
    } else {
      const options = [t('Post:options:report'), t('Post:options:cancel')]
      showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
          tintColor: 'black',
        },
        index => {
          if (index === 0) {
            openLink(`mailto:report@wrench.cc?subject=Report%20post:%20${post.id}`)
          }
        }
      )
    }
  }, [handleEdit, onDelete, showActionSheetWithOptions])

  return (
    <Base paddingBottom={paddingBottom}>
      <Top>
        <Avatar uri={post.user.avatarUrl} onPress={navigateToUser} isOnline={post.user.isOnline} />
        <Icon source={share} onPress={handleActionSheet} hitSlop={20} />
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
          numberOfLines={numberOfLines}
        >
          {post.caption}
        </Text>

        <Spacer />

        {post.files && <Carousel files={post.files} onPress={navigateToProject} />}
      </Content>

      <LikePost post={post} />

      {!withoutComments && <Comments data={post} />}
      <TimeAgo date={post.createdAt} long />
    </Base>
  )
}

export default deletePost(Post)
