import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { navigateToUser } from 'navigation/actions'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import TimeAgo from 'ui/TimeAgo'
import { COLORS } from 'ui/constants'
import { Base, Content, Row, Reply } from './styles'

const Item = memo(function Item({
  createdAt,
  first = false,
  highlight = false,
  id,
  isReply,
  onReply,
  t,
  text,
  user,
}) {
  const animatedValue = new Animated.Value(0)

  if (highlight) {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
    }).start(() => {
      Animated.timing(animatedValue, {
        toValue: 0,
        delay: 3000,
      }).start()
    })
  }

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.WHITE, COLORS.ULTRA_LIGHT_GREY],
  })

  if (!user) return null

  return (
    <Animated.View style={{ backgroundColor }}>
      <Base isReply={isReply} first={first}>
        <Avatar
          uri={user.avatarUrl}
          size={isReply ? 20 : 30}
          isOnline={user.isOnline}
          badgeSize={isReply && 'small'}
          onPress={() => navigateToUser({ user })}
        />
        <Content>
          <Row style={{ flexDirection: 'column' }}>
            <Text fontSize={15} bold>
              {`${user.fullName} `}
              {text && <Text fontSize={15}>{text}</Text>}
            </Text>
          </Row>
          <Row>
            <TimeAgo date={createdAt} />
            {!first && (
              <Reply medium fontSize={12} onPress={() => onReply(user, id)} disabled={id < 0}>
                {t('CommentItem:reply')}
              </Reply>
            )}
          </Row>
        </Content>
      </Base>
    </Animated.View>
  )
})

Item.propTypes = {
  createdAt: PropTypes.string.isRequired,
  first: PropTypes.bool,
  highlight: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isReply: PropTypes.bool,
  onReply: PropTypes.func,
  text: PropTypes.string,
  user: PropTypes.object.isRequired,
}

export default Item
