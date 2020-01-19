import React from 'react'
import { Dimensions, FlatList } from 'react-native'
import { useProjectTypesQuery } from '@wrench/common'
import { Touchable, Text, Loader } from 'ui'
import { Cell, Image, Overlay, Picture } from './styles'

const { width } = Dimensions.get('window')

const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

const keyExtractor = item => item.id

function ProjectCategories({ ListHeaderComponent, onSelect }) {
  const { data, loading } = useProjectTypesQuery()

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={loading && <Loader color="grey" />}
      contentContainerStyle={{
        flex: loading ? 1 : 0,
        padding: 5,
        paddingBottom: 30,
      }}
      numColumns={2}
      data={data.types}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => (
        <Cell key={item.id}>
          <Touchable onPress={() => onSelect(item)}>
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

export default ProjectCategories
