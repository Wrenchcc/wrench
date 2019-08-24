import React, { useEffect, useState, useCallback } from 'react'
import { Alert, Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import openLink from 'utils/openLink'
import { isAndroid } from 'utils/platform'
import { deletePost } from 'graphql/mutations/post/deletePost'
import { Avatar, Carousel, Comments, Title, Text, Icon, TimeAgo, ActionSheet, EditPost } from 'ui'
import LikePost from 'components/LikePost'
import { share } from 'images'
import { Base, Top, Headline, Content, Spacer } from './styles'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidHide' : 'keyboardWillHide'

function Post({ post, withoutTitle, withoutComments, deletePost: deletePostMutation }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const [actionSheetIsOpen, setActionSheetIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)

  const toggleActionSheet = () => setActionSheetIsOpen(!actionSheetIsOpen)
  const toggleEdit = () => setIsEditing(!isEditing)

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

  const postActions = useCallback(() => {
    const options = []

    if (post.permissions.isOwner) {
      options.push(
        {
          name: t('Post:options:edit'),
          onSelect: toggleEdit,
        },
        {
          name: t('Post:options:delete'),
          onSelect: onDelete,
        }
      )
    } else {
      options.push({
        name: t('Post:options:report'),
        onSelect: () => openLink(`mailto:report@wrench.cc?subject=Report%20post:%20${post.id}`),
      })
    }

    return (
      <ActionSheet
        isOpen={actionSheetIsOpen}
        onClose={toggleActionSheet}
        destructiveButtonIndex={options.length - 1}
        options={[...options, { name: t('Post:options:cancel') }]}
      />
    )
  }, [toggleEdit, onDelete])

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

  return (
    <Base>
      <Top>
        <Avatar uri={post.user.avatarUrl} onPress={navigateToUser} isOnline={post.user.isOnline} />
        <Icon source={share} onPress={toggleActionSheet} hitSlop={20} />
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
            numberOfLines={!withoutTitle ? 3 : 0}
          >
            {post.caption}
          </Text>
        )}

        <Spacer />

        {post.files && <Carousel files={post.files} onPress={navigateToProject} />}
      </Content>

      <LikePost post={post} />

      {!withoutComments && !post.project.commentsDisabled && <Comments data={post} />}
      <TimeAgo date={post.createdAt} long />
      {!isEditing && postActions()}
    </Base>
  )
}

export default deletePost(Post)
