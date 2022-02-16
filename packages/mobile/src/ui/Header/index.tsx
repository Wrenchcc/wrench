import React from 'react'
import { View } from 'react-native'
import { STATUS_BAR_HEIGHT, TOP_BAR_HEIGHT } from 'navigation/constants'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  background: {
    zIndex: 10,
  },
  base: {
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: STATUS_BAR_HEIGHT,
    height: TOP_BAR_HEIGHT,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
}

function Header({ headerLeft, headerTitle, headerRight, color }) {
  return (
    <View
      style={[
        styles.background,
        {
          backgroundColor: color ? color : PlatformColor.default,
        },
      ]}
    >
      <View style={styles.base}>
        <View style={styles.left}>{headerLeft}</View>
        <View style={styles.center}>{headerTitle}</View>
        <View style={styles.right}>{headerRight}</View>
      </View>
    </View>
  )
}

export default Header
