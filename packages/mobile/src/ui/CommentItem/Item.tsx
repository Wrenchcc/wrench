import React, { memo, useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import { useNavigation, SCREENS } from 'navigation'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import TimeAgo from 'ui/TimeAgo'
import { COLORS } from 'ui/constants'
import { Base, Content, Row, Reply } from './styles'

function Item({
  createdAt,
  first = false,
  highlightId,
  id,
  commentId,
  isReply,
  onReply,
  t,
  text,
  user,
}) {
  const { navigate } = useNavigation()
  const animatedValue = useRef(new Animated.Value(0))

  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.USER, {
        user,
      }),
    [user]
  )

  const handleOnReply = useCallback(
    () =>
      onReply({
        commentId: commentId || id,
        username: user.username,
      }),
    [user, commentId, id, onReply]
  )

  if (highlightId === id) {
    Animated.timing(animatedValue.current, {
      duration: 1000,
      toValue: 1,
    }).start(() => {
      Animated.timing(animatedValue.current, {
        delay: 3000,
        toValue: 0,
      }).start()
    })
  }

  const backgroundColor = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.WHITE, COLORS.ULTRA_LIGHT_GREY],
  })

  if (!user) {
    return null
  }

  return (
    <Animated.View style={{ backgroundColor }}>
      <Base isReply={isReply} first={first}>
        <Avatar
          uri={user.avatarUrl}
          size={isReply ? 20 : 30}
          isOnline={user.isOnline}
          badgeSize={isReply && 'small'}
          onPress={handleNavigation}
        />
        <Content>
          <Row>
            <Text>
              <Text fontSize={15} bold>{`${user.fullName} `}</Text>
              {text && <Text fontSize={15}>{text}</Text>}
            </Text>
          </Row>

          <Row>
            <TimeAgo date={createdAt} />
            {!first && (
              <Reply medium fontSize={12} onPress={handleOnReply} disabled={id < 0}>
                {t('CommentItem:reply')}
              </Reply>
            )}
          </Row>
        </Content>
      </Base>
    </Animated.View>
  )
}

export default memo(Item)
