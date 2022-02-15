import React from 'react'
import { View } from 'react-native'
import { ProgressBar } from 'ui'
import { NAVIGATION } from 'navigation'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    height: NAVIGATION.TAB_HEIGHT,
    backgroundColor: PlatformColor.default,
    justifyContent: 'center',
    position: 'absolute',
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
}

function Footer({ progress }) {
  return (
    <View style={styles.base}>
      <ProgressBar progress={progress} backgroundColor="neutral" />
    </View>
  )
}

export default Footer
