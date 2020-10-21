import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from 'ui'
import { Placeholder, PlaceholderLine, PlaceholderAnimation } from 'ui/Placeholder'
import { GUTTER } from './styles'
import AddCollection from 'components/AddCollection'

const COUNT = 7

const styles = {
  container: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  first: {
    marginLeft: 20,
  },
  last: {
    marginRight: 20,
  },
  title: {
    borderRadius: 0,
    marginTop: 12,
  },
}

export const PopularPlaceholder: React.FC = ({ empty, isOwner, projectId, disableModal }) => {
  return (
    <Placeholder Animation={empty ? null : PlaceholderAnimation}>
      {empty && (
        <View style={{ marginBottom: 30 }}>
          <Text medium style={{ marginBottom: 5 }}>
            Collections
          </Text>
          <Text fontSize={15}>
            Keep better track of your progress and add your posts to collections
          </Text>
        </View>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      >
        {isOwner && (
          <View style={[styles.container, styles.first, { height: 90 }]}>
            <AddCollection projectId={projectId} disableModal={disableModal} />
          </View>
        )}

        {new Array(COUNT).fill({}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.container,
              index === COUNT - 1 && styles.last,
              index === 0 && !isOwner && styles.first,
            ]}
          >
            <PlaceholderLine noMargin style={styles.image} />
            {!empty && <PlaceholderLine style={styles.title} noMargin width={100} />}
          </View>
        ))}
      </ScrollView>
    </Placeholder>
  )
}

export default PopularPlaceholder
