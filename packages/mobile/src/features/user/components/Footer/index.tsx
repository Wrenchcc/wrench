import React from 'react'
import { View } from 'react-native'
import { Text } from 'ui'
import { readableVersion } from 'utils/appVersion'

const styles = {
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingRight: 0,
    paddingBottom: 30,
    paddingLeft: 0,
  },
}

function Footer() {
  return (
    <View style={styles.base}>
      <Text fontSize={15} color="accent">
        {`v${readableVersion}`}
      </Text>
    </View>
  )
}

export default Footer
