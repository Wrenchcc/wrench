import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { Badge } from 'ui'

export default (source, badge = false) => {
  const TabBarIcon = ({ tintColor }) => (
    <>
      {badge && <Badge />}
      <Image source={source} style={{ tintColor }} />
    </>
  )

  TabBarIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
  }

  return TabBarIcon
}
