import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Animated, Image } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Swipeable, RectButton } from 'react-native-gesture-handler'
import { navigateToUser, navigateToProject, navigateToComments } from 'navigation'
import { Avatar, Text, TimeAgo } from 'ui'
import { COLORS } from 'ui/constants'
import { trash } from 'images'
import { NOTIFICATION_TYPES } from 'utils/enums'
import { Base, Content, Bottom } from './styles'

const onPress = data => {
  switch (data.type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return navigateToProject({ project: data.project })
    case NOTIFICATION_TYPES.NEW_MENTION:
    case NOTIFICATION_TYPES.NEW_COMMENT:
    case NOTIFICATION_TYPES.NEW_REPLY:
      return navigateToComments({
        id: data.comment.postId,
        user: data.user,
        commentId: data.comment.id,
      })
    default:
      return null
  }
}

const description = (data, t) => {
  switch (data.type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return `${t('Notification:follow')}: "${data.project.title}"`
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return `${t('Notification:comment')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_REPLY:
      return `${t('Notification:reply')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_MENTION:
      return `${t('Notification:mention')}: "${data.comment.text}"`
    default:
      return null
  }
}

const styles = {
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
}

// Hide this Notification
// Cancel, Hide
class Notification extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    deleteNotification: PropTypes.func.isRequired,
  }

  renderRightAction = progress => {
    const width = 80
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0],
    })

    const pressHandler = () => {
      this.swipable.close()
      this.props.deleteNotification()
    }

    return (
      <Animated.View style={{ width, transform: [{ translateX }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: COLORS.RED }]}
          onPress={pressHandler}
        >
          <Image source={trash} />
        </RectButton>
      </Animated.View>
    )
  }

  setRef = ref => {
    this.swipable = ref
  }

  render() {
    const { data, t } = this.props
    return (
      <Swipeable
        ref={this.setRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this.renderRightAction}
      >
        <Base onPress={() => onPress(data)}>
          <Avatar
            uri={data.user.avatarUrl}
            size={40}
            onPress={() => navigateToUser({ user: data.user })}
            isOnline={data.user.isOnline}
          />
          <Content>
            <Text onPress={() => navigateToUser({ user: data.user })}>{data.user.fullName}</Text>
            <Bottom>
              <View style={{ marginRight: 50 }}>
                <Text
                  color="light_grey"
                  fontSize={15}
                  lineHeight={22}
                  onPress={() => onPress(data)}
                  numberOfLines={2}
                >
                  {description(data, t)}
                </Text>
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <TimeAgo date={data.createdAt} fontSize={15} />
              </View>
            </Bottom>
          </Content>
        </Base>
      </Swipeable>
    )
  }
}

export default withNamespaces('Notification')(Notification)
