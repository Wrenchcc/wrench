import React, { useRef, useCallback } from 'react'
import { Dimensions, View, Animated, Image as RNImage } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Swipeable } from 'react-native-gesture-handler'
import { Transitioning } from 'react-native-reanimated'
import { pathOr } from 'rambda'
import { useNavigation, SCREENS } from 'navigation'
import Avatar from 'ui/Avatar'
import Image from 'ui/Image'
import Text from 'ui/Text'
import TimeAgo from 'ui/TimeAgo'
import Toucable from 'ui/Touchable'
import { trash } from 'images'
import { NOTIFICATION_TYPES } from 'utils/enums'
import transition from './transition'

export const { width } = Dimensions.get('window')

const DELETE_COLOR = 'rgb(246, 86, 86)'

const styles = {
  base: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}

function description(data, t) {
  switch (data.type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return `${t('follow')}: "${data.project.title}"`
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return `${t('comment')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_REPLY:
      return `${t('reply')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_MENTION:
      return `${t('mention')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_POST_LIKE:
      return t('postLike')
    case NOTIFICATION_TYPES.NEW_COMMENT_LIKE:
      return t('commentLike')
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
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: DELETE_COLOR }}>
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
  const { t } = useTranslation('notifications')
  const transitionRef = useRef(null)

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
        <Toucable onPress={handleOnPress} style={styles.base}>
          <Avatar
            uri={data.user.avatarUrl}
            size={40}
            onPress={navigateToUser}
            isOnline={data.user.isOnline}
            fallback={data.user.isSilhouette}
            fullName={data.user.fullName}
          />
          <View style={styles.content}>
            <Text onPress={navigateToUser}>{data.user.fullName}</Text>
            <View style={styles.bottom}>
              <Text color="accent" fontSize={15} lineHeight={22} onPress={handleOnPress}>
                {description(data, t)}. <TimeAgo date={data.createdAt} fontSize={15} />
              </Text>
            </View>
          </View>

          <Image source={image} width={40} height={40} />
        </Toucable>
      </Swipeable>
    </Transitioning.View>
  )
}

export default Notification
