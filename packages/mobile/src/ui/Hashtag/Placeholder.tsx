import React from 'react'
import { View } from 'react-native'
import { Placeholder, PlaceholderLine, PlaceholderAnimation } from 'ui/Placeholder'

const styles = {
  container: {
    height: 71,
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

export const HashtagPlaceholder: React.FC = () => {
  return (
    <Placeholder style={styles.container} Animation={PlaceholderAnimation}>
      <View style={styles.content}>
        <PlaceholderLine width={60} style={[styles.line, styles.first]} />
        <PlaceholderLine width={40} style={styles.line} />
      </View>
    </Placeholder>
  )
}

export default HashtagPlaceholder
