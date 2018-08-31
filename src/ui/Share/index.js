import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import NativeShare from 'react-native-share'
import { track, events } from 'utils/analytics'
import hitSlop from 'utils/hitSlop'
import { share } from 'images'
import { Base, Button, Icon } from './styles'

export default class Share extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  openShare = () => {
    const { url, title } = this.props
    track(events.PROJECT_SHARE_OPEN)

    NativeShare.open({
      title,
      url,
    }).catch(() => {
      track(events.PROJECT_SHARE_CLOSED)
    })
  }

  render() {
    return (
      <Base>
        <Button hapticFeedback="impactLight" onPress={this.openShare} hitSlop={hitSlop(20)}>
          <Icon source={share} />
        </Button>
      </Base>
    )
  }
}
