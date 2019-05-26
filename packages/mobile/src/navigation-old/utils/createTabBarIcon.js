import React from 'react'
import PropTypes from 'prop-types'
import { Image, View } from 'react-native'
import { Badge } from 'ui'

export default (source, badge = false) => {
  const TabBarIcon = ({ tintColor }) => (
    <View style={{ position: 'relative' }}>
      {badge && <Badge />}
      <Image source={source} style={{ tintColor }} />
    </View>
  )

  TabBarIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
  }

  return TabBarIcon
}
