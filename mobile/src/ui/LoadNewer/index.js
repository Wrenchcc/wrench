import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import { translate } from 'react-i18next'

const HEIGHT = 40
const TOP = 20

class LoadNewer extends PureComponent {
  animatedValue = new Animated.Value(-HEIGHT + TOP)

  componentDidMount() {
    Animated.spring(this.animatedValue, {
      toValue: 0,
      delay: 1000,
    }).start()
  }

  render() {
    const { t } = this.props
    return <Animated.View>{t('LoadNewer:button')}</Animated.View>
  }
}

export default translate('LoadNewer')(LoadNewer)
