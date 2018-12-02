import React from 'react'
import { Animated } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { navigateToUser } from 'navigation'
import { Avatar, Text, TimeAgo } from 'ui'
import { COLORS } from 'ui/constants'
import { Base, Content, Row, Reply } from './styles'

// TODO: Refactor and fix date
// TODO: Pass correct data to profile
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

  if (!user) return null

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
            <Text fontSize={15} bold>
              {`${user.fullName} `}
              <Text fontSize={15}>{text}</Text>
            </Text>
          </Row>
          <Row>
            <TimeAgo date={createdAt} />
            <Reply medium fontSize={12} onPress={() => onReply(user)}>
              {t('CommentItem:reply')}
            </Reply>
          </Row>
        </Content>
      </Base>
    </Animated.View>
  )
}

const CommentItem = props => props.item.repliesConnection ? (
    <>
      <Item {...props.item} onReply={props.onReply} t={props.t} />
      {props.item.repliesConnection.edges.map(({ node }) => (
        <Item key={node.id} isReply {...node} id={node.id} t={props.t} onReply={props.onReply} />
      ))}
    </>
) : (
    <Item {...props.item} t={props.t} onReply={props.onReply} />
)

export default withNamespaces('CommentItem')(CommentItem)
