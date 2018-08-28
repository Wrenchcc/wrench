import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import NativeShare from 'react-native-share'
import { track, events, logError } from 'utils/analytics'
import hitSlop from 'utils/hitSlop'
import { share } from 'images'
import { createDynamicLink } from 'utils/dynamicLinks'
import { Base, Button, Icon } from './styles'

export default class Share extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }

  createLink = async () => {
    const { slug, title } = this.props
    track(events.PROJECT_SHARE_OPEN)

    try {
      const url = await createDynamicLink(slug)

      NativeShare.open({
        title,
        url,
      }).catch(() => {
        track(events.PROJECT_SHARE_CLOSED)
      })
    } catch (err) {
      logError(err)
    }
  }

  render() {
    return (
      <Base>
        <Button hapticFeedback="impactLight" onPress={this.createLink} hitSlop={hitSlop(20)}>
          <Icon source={share} />
        </Button>
      </Base>
    )
  }
}
