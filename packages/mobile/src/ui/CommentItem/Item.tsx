import React, { useCallback } from 'react'
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
  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.USER, {
        username: user.username,
      }),
    [user]
  )

  const handleOnReply = useCallback(
    () =>
      onReply({
        commentId: commentId || id,
        username: user.username,
      }),
    [user.username, commentId, id]
  )

  const animatedValue = new Animated.Value(0)

  if (highlightId === id) {
    Animated.timing(animatedValue, {
      duration: 1000,
      toValue: 1,
    }).start(() => {
      Animated.timing(animatedValue, {
        delay: 3000,
        toValue: 0,
      }).start()
    })
  }

  const backgroundColor = animatedValue.interpolate({
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

export default Item
