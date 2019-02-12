import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

const getSize = size => ({
  background: {
    right: -1,
    bottom: -1,
    width: size === 'medium' ? 14 : 10,
    height: size === 'medium' ? 14 : 10,
    borderRadius: size === 'medium' ? 14 : 10,
  },
  badge: {
    right: 1,
    bottom: 1,
    width: size === 'medium' ? 10 : 6,
    height: size === 'medium' ? 10 : 6,
    borderRadius: size === 'medium' ? 10 : 6,
  },
})

const IsOnline = ({ badgeSize = 'medium' }) => (
  <>
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        zIndex: 10,
        backgroundColor: '#05b01e',
        ...getSize(badgeSize).badge,
      }}
    />
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        zIndex: 5,
        backgroundColor: 'white',
        ...getSize(badgeSize).background,
      }}
    />
  </>
)

IsOnline.propTypes = {
  badgeSize: PropTypes.string,
}

export default IsOnline
