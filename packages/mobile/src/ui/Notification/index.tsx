import React, { useRef, useCallback } from 'react'
import { Dimensions, View, Animated, Image as RNImage } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Swipeable } from 'react-native-gesture-handler'
import { Transitioning } from 'react-native-reanimated'
import { pathOr } from 'ramda'
import { useNavigation, SCREENS } from 'navigation'
import Avatar from 'ui/Avatar'
import Image from 'ui/Image'
import Text from 'ui/Text'
import TimeAgo from 'ui/TimeAgo'
import { COLORS } from 'ui/constants'
import { trash } from 'images'
import { NOTIFICATION_TYPES } from 'utils/enums'
import { Base, Content, Bottom } from './styles'
import transition from './transition'

export const { width } = Dimensions.get('window')

function description(data, t) {
  switch (data.type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return `${t('Notification:follow')}: "${data.project.title}"`
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return `${t('Notification:comment')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_REPLY:
      return `${t('Notification:reply')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_MENTION:
      return `${t('Notification:mention')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_POST_LIKE:
      return t('Notification:postLike')
    case NOTIFICATION_TYPES.NEW_COMMENT_LIKE:
      return t('Notification:commentLike')
    default:
      return null
  }
}

function renderRightAction(progress) {
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  })

  return (
    <Animated.View style={{ width, transform: [{ translateX }] }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.RED }}>
        <View style={{ paddingLeft: 30 }}>
          <RNImage source={trash} />
        </View>
      </View>
    </Animated.View>
  )
}

function onPress(data, navigate) {
  switch (data.type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return navigate(SCREENS.PROJECT, {
        id: data.project.id,
        project: data.project,
      })
    case NOTIFICATION_TYPES.NEW_POST_LIKE: {
      return navigate(SCREENS.POST, {
        postId: data.post.id,
      })
    }
    case NOTIFICATION_TYPES.NEW_COMMENT_LIKE:
      return navigate(SCREENS.POST, {
        postId: data.comment.postId,
      })
    case NOTIFICATION_TYPES.NEW_MENTION:
    case NOTIFICATION_TYPES.NEW_COMMENT:
    case NOTIFICATION_TYPES.NEW_REPLY:
      return navigate(SCREENS.POST, {
        commentId: data.comment.id,
        postId: data.comment.postId,
      })
    default:
      return null
  }
}

function Notification({ data, deleteNotification }) {
  const transitionRef = useRef(null)
  const { t } = useTranslation()

  const image = pathOr(false, ['files', 'edges', 0, 'node'], data)

  const { navigate } = useNavigation()

  const navigateToUser = useCallback(
    () =>
      navigate(SCREENS.USER, {
        user: data.user,
      }),
    []
  )

  const handleOnPress = useCallback(() => onPress(data, navigate), [])

  const handleDelete = useCallback(() => {
    deleteNotification(data.id)
    transitionRef.current.animateNextTransition()
  }, [data, transitionRef])

  return (
    <Transitioning.View ref={transitionRef} transition={transition}>
      <Swipeable
        friction={2}
        rightThreshold={100}
        renderRightActions={renderRightAction}
        onSwipeableRightOpen={handleDelete}
      >
        <Base onPress={handleOnPress}>
          <Avatar
            uri={data.user.avatarUrl}
            size={40}
            onPress={navigateToUser}
            isOnline={data.user.isOnline}
          />
          <Content>
            <Text onPress={navigateToUser}>{data.user.fullName}</Text>
            <Bottom>
              <Text color="light_grey" fontSize={15} lineHeight={22} onPress={handleOnPress}>
                {description(data, t)}. <TimeAgo date={data.createdAt} fontSize={15} />
              </Text>
            </Bottom>
          </Content>

          <Image source={image} width={40} height={40} />
        </Base>
      </Swipeable>
    </Transitioning.View>
  )
}

export default Notification
