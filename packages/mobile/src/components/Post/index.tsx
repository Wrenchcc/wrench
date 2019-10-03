import React, { useEffect, useState, useCallback } from 'react'
import { Alert, Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useNavigation, SCREENS } from 'navigation'
import openLink from 'utils/openLink'
import { isAndroid } from 'utils/platform'
import { deletePost } from 'graphql/mutations/post/deletePost'
import { Avatar, Carousel, Comments, Title, Text, Icon, TimeAgo, EditPost } from 'ui'
import LikePost from 'components/LikePost'
import { share } from 'images'
import { Base, Top, Headline, Content, Spacer } from './styles'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidHide' : 'keyboardWillHide'

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
  const [isEditing, setIsEditing] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)

  const toggleEdit = () => setIsEditing(!isEditing)

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

  useEffect(() => {
    const keyboardEventListener = Keyboard.addListener(KEYBOARD_EVENT_LISTENER, () => {
      if (hasChanged && isEditing && !alertOpen) {
        setAlertOpen(true)

        Alert.alert(
          t('Post:options:alertTitle'),
          t('Post:options:alertDescription'),
          [
            {
              onPress: () => {
                setIsEditing(false)
                setAlertOpen(false)
              },
              style: 'destructive',
              text: t('Post:options:discard'),
            },
            {
              onPress: () => setAlertOpen(false),
              style: 'cancel',
              text: t('Post:options:cancel'),
            },
          ],
          { cancelable: false }
        )
      } else if (!hasChanged) {
        setIsEditing(false)
        setAlertOpen(false)
      }
    })
    return () => keyboardEventListener.remove()
  }, [hasChanged, isEditing, alertOpen])

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
            toggleEdit()
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
            alert(`mailto:report@wrench.cc?subject=Report%20post:%20${post.id}`)
          }
        }
      )
    }
  }, [toggleEdit, onDelete, showActionSheetWithOptions])

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

        {isEditing ? (
          <EditPost
            post={post}
            color={withoutTitle ? 'dark' : 'grey'}
            onSubmit={toggleEdit}
            hasChanged={hasChanged => setHasChanged(hasChanged)}
          />
        ) : (
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
        )}

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
