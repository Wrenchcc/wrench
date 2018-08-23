import React from 'react'
import PropTypes from 'prop-types'
import NativeShare from 'react-native-share'
import { track, events } from 'utils/analytics'
import hitSlop from 'utils/hitSlop'
import { share } from 'images'
import { Base, Button, Icon } from './styles'

// TODO: Change deeplink to web or firebase deeplink
const Share = ({ name, url }) => (
  <Base>
    <Button
      hapticFeedback="impactLight"
      onPress={() => {
        track(events.PROJECT_SHARE_OPEN)

        NativeShare.open({
          title: name,
          url,
        }).catch(() => {
          track(events.PROJECT_SHARE_CLOSED)
        })
      }}
      hitSlop={hitSlop(20)}
    >
      <Icon source={share} />
    </Button>
  </Base>
)

Share.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Share
