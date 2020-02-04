import React from 'react'
import { ScrollView } from 'react-native'
import { Placeholder, PlaceholderLine } from 'rn-placeholder'
import { PlaceholderAnimation } from 'ui'

const COUNT = 6

export const CategoriesPlaceholder: React.FC = () => {
  return (
    <Placeholder Animation={PlaceholderAnimation}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: 'white',
        }}
      >
        {new Array(COUNT).fill({}).map((_, index) => (
          <PlaceholderLine
            key={index}
            style={[
              styles.category,
              index === 0 && styles.first,
              index === COUNT - 1 && styles.last,
            ]}
            noMargin
            width={100}
            height={40}
          />
        ))}
      </ScrollView>
    </Placeholder>
  )
}

const styles = {
  category: {
    width: 80,
    borderRadius: 0,
    marginRight: 10,
  },
  first: {
    marginLeft: 20,
  },
  last: {
    marginRight: 20,
  },
}

export default CategoriesPlaceholder
