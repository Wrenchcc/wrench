import React from 'react'
import { Dimensions, FlatList } from 'react-native'
import { getProjectTypes } from 'graphql/queries/project/getProjectTypes'
import { Touchable, Text, Loader } from 'ui'
import { Cell, Image, Overlay, Picture } from './styles'

const { width } = Dimensions.get('window')

const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

function ProjectCategories({ ListHeaderComponent, isFetching, types, onSelect }) {
  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={isFetching && <Loader color="grey" />}
      contentContainerStyle={{
        padding: 5,
        flex: isFetching ? 1 : 0,
        paddingBottom: 30,
      }}
      numColumns={2}
      data={types}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Cell key={item.id}>
          <Touchable hapticFeedback="impactLight" onPress={() => onSelect(item)}>
            <Picture width={ITEM_SIZE} height={ITEM_SIZE}>
              <Image
                placeholderColor="transparent"
                source={{ uri: item.imageUrl }}
                width={ITEM_SIZE}
                height={ITEM_SIZE}
                gutter={GUTTER}
              >
                <Overlay />
                <Text color="white">{item.title}</Text>
              </Image>
            </Picture>
          </Touchable>
        </Cell>
      )}
    />
  )
}

export default getProjectTypes(ProjectCategories)
