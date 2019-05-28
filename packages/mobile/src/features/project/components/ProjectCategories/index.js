import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, FlatList } from 'react-native'
import { getProjectTypes } from 'graphql/queries/project/getProjectTypes'
import { Touchable, Text, Loader } from 'ui'
import { Cell, Image, Overlay, Picture } from './styles'

const { width } = Dimensions.get('window')

const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

class ProjectCategories extends PureComponent {
  static propTypes = {
    types: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    ListHeaderComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }

  renderItem = ({ item }) => (
    <Cell key={item.id}>
      <Touchable hapticFeedback="impactLight" onPress={() => this.props.onSelect(item)}>
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
  )

  render() {
    const { ListHeaderComponent, isFetching, types } = this.props

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
        renderItem={this.renderItem}
      />
    )
  }
}

export default getProjectTypes(ProjectCategories)
