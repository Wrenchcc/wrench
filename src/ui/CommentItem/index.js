import React, { Fragment } from 'react'
import { Animated } from 'react-native'
import { navigateToProfile } from 'navigation'
import { Avatar, Text, TimeAgo } from 'ui'
import { COLORS } from 'ui/constants'
import { Base, Content, Row, Reply } from './styles'

// TODO: Refactor and fix date
const Item = ({ id, user, text, isReply, onReply, createdAt, highlightedId = null }) => {
  const animatedValue = new Animated.Value(0)

  if (id === highlightedId) {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
    }).start(() => {
      Animated.timing(animatedValue, {
        toValue: 0,
        delay: 1000,
      }).start()
    })
  }

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.WHITE, COLORS.BEIGE],
  })

  return (
    <Animated.View style={{ backgroundColor }}>
      <Base isReply={isReply}>
        <Avatar
          uri={user.avatarUrl}
          size={isReply ? 20 : 30}
          onPress={() => navigateToProfile({ user })}
        />
        <Content>
          <Row>
            <Text fontSize={15}>{`[${user.fullName}:${user.id}] ${text}`}</Text>
          </Row>
          <Row>
            <TimeAgo date={createdAt} />
            <Reply medium fontSize={12} onPress={() => onReply(user)}>
              Reply
            </Reply>
          </Row>
        </Content>
      </Base>
    </Animated.View>
  )
}

// TODO: Remove id not needed when uniq ids "child-"
const CommentItem = props => props.item.replies ? (
    <Fragment>
      <Item {...props.item} onReply={props.onReply} />
      {props.item.replies.map(item => (
        <Item key={item.id} isReply {...item} id={`child-${item.id}`} onReply={props.onReply} />
      ))}
    </Fragment>
) : (
    <Item {...props.item} onReply={props.onReply} />
)

export default CommentItem
