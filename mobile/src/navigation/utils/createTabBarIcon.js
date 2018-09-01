import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { Badge } from 'ui'

export default (source, badge = false) => {
  const TabBarIcon = ({ tintColor }) => (
    <Fragment>
      {badge && <Badge />}
      <Image source={source} style={{ tintColor }} />
    </Fragment>
  )

  TabBarIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
  }

  return TabBarIcon
}
