import React, { Fragment } from 'react'
import { Animated } from 'react-native'
import { navigateToUser } from 'navigation'
import withLocalization from 'i18n/withLocalization'
import { Avatar, Text, TimeAgo } from 'ui'
import { COLORS } from 'ui/constants'
import { Base, Content, Row, Reply } from './styles'

// TODO: Refactor and fix date
// TODO: Pass correct data to profile
// TODO: Make user in comment clickalbe (flex problem)
const Item = ({ id, user, text, isReply, onReply, createdAt, highlightedId = null, t }) => {
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
          onPress={() => navigateToUser({ user })}
        />
        <Content>
          <Row style={{ flexDirection: 'column' }}>
            <Text fontSize={15} bold onPress={() => navigateToUser({ user })}>
              {`${user.fullName} `}
            </Text>
            <Text fontSize={15}>{text}</Text>
          </Row>
          <Row>
            <TimeAgo date={createdAt} />
            <Reply medium fontSize={12} onPress={() => onReply(user)}>
              {t('.reply')}
            </Reply>
          </Row>
        </Content>
      </Base>
    </Animated.View>
  )
}

const CommentItem = props => props.item.repliesConnection ? (
    <Fragment>
      <Item {...props.item} onReply={props.onReply} t={props.t} />
      {props.item.repliesConnection.edges.map(({ node }) => (
        <Item key={node.id} isReply {...node} id={node.id} t={props.t} onReply={props.onReply} />
      ))}
    </Fragment>
) : (
    <Item {...props.item} t={props.t} onReply={props.onReply} />
)

export default withLocalization(CommentItem, 'CommentItem')
