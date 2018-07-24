import React from 'react'
import PropTypes from 'prop-types'
import NativeShare from 'react-native-share'
import hitSlop from 'utils/hitSlop'
import { warn } from 'utils/logger'
import { share } from 'images'
import { Base, Button, Icon } from './styles'

// TODO: Change deeplink to web or firebase deeplink
const Share = ({ name, url }) => (
  <Base>
    <Button
      hapticFeedback="impactLight"
      onPress={() => NativeShare.open({
        title: name,
        url,
      }).catch(err => warn(err))
      }
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
