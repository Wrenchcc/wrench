import React from 'react'
import { View } from 'react-native'
import { Placeholder, PlaceholderLine, PlaceholderAnimation } from 'ui/Placeholder'

const styles = {
  container: {
    height: 71,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  content: {
    marginLeft: 10,
  },
  first: {
    marginTop: 6,
    marginBottom: 8,
  },
  line: {
    borderRadius: 10,
    height: 10,
  },
}

export const UserPlaceholder = () => {
  return (
    <Placeholder
      style={styles.container}
      Animation={PlaceholderAnimation}
      Left={() => <PlaceholderLine style={styles.avatar} />}
    >
      <View style={styles.content}>
        <PlaceholderLine width={60} style={[styles.line, styles.first]} />
        <PlaceholderLine width={40} style={styles.line} />
      </View>
    </Placeholder>
  )
}

export default UserPlaceholder
