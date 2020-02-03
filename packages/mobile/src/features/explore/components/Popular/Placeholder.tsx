import React from 'react'
import { ScrollView, View } from 'react-native'
import { Placeholder, PlaceholderLine } from 'rn-placeholder'
import { PlaceholderAnimation } from 'ui'
import { GUTTER } from './styles'

export const PopularPlaceholder: React.FC = () => {
  return (
    <Placeholder Animation={PlaceholderAnimation}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      >
        {new Array(3).fill({}).map((_, index) => (
          <View
            key={index}
            style={[styles.container, index === 0 && styles.first, index === 3 && styles.last]}
          >
            <PlaceholderLine noMargin style={styles.image} />
            <PlaceholderLine style={styles.projectName} noMargin width={90} />
            <PlaceholderLine style={styles.projectName} noMargin width={60} />
          </View>
        ))}
      </ScrollView>
    </Placeholder>
  )
}

const styles = {
  container: {
    marginRight: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 0,
  },
  first: {
    marginLeft: 20,
  },
  last: {
    marginRight: 20,
  },
  projectName: {
    borderRadius: 0,
    marginTop: 10,
    marginBottom: 5,
  },
}

export default PopularPlaceholder
