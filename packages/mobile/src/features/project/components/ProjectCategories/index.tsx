import React from 'react'
import { View, Dimensions, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useProjectTypesQuery } from '@wrench/common'
import { Touchable, Text, Loader } from 'ui'
import { keyExtractor } from 'navigation'

const { width } = Dimensions.get('window')

const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

const styles = {
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    margin: GUTTER / 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(000, 000, 000, 0.4)',
  },
  cell: {
    width: '50%',
  },
}

function ProjectCategories({ ListHeaderComponent, onSelect }) {
  const { data, loading } = useProjectTypesQuery()

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.cell}>
      <Touchable onPress={() => onSelect(item)}>
        <View
          style={{
            width: ITEM_SIZE,
            height: ITEM_SIZE,
          }}
        >
          <FastImage
            placeholderColor="transparent"
            source={{ uri: item.imageUrl }}
            style={[
              style.image,
              {
                height: ITEM_SIZE - GUTTER / 2,
                width: ITEM_SIZE - GUTTER / 2,
              },
            ]}
          >
            <View style={styles.overlay} />
            <Text color="white">{item.title}</Text>
          </FastImage>
        </View>
      </Touchable>
    </View>
  )

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={loading && <Loader />}
      contentContainerStyle={{
        flex: loading ? 1 : 0,
        padding: 5,
        paddingBottom: 30,
      }}
      numColumns={2}
      data={data?.types}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  )
}

export default ProjectCategories
