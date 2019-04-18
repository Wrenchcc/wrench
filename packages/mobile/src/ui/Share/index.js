import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import NativeShare from 'react-native-share'
import withTranslation from 'i18n/withTranslation'
import { track, events } from 'utils/analytics'
import { Text } from 'ui'
import { share } from 'images'
import { Base, Button, Icon } from './styles'

class Share extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.bool,
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
    const { t, text } = this.props
    return (
      <Base>
        <Button hapticFeedback="impactLight" onPress={this.openShare} hitSlop={20}>
          {text ? <Text>{t('Share:share')}</Text> : <Icon source={share} />}
        </Button>
      </Base>
    )
  }
}

export default withTranslation('Share')(Share)
