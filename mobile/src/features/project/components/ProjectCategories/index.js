import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, FlatList } from 'react-native'
import { compose } from 'react-apollo'
import { getProjectCategories } from 'graphql/queries/project/getProjectCategories'
import { Touchable, Text, Loader } from 'ui'
import { Cell, Image, Overlay } from './styles'

const { width } = Dimensions.get('window')

const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

class ProjectCategories extends PureComponent {
  static propTypes = {
    categories: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  renderItem = ({ item }) => (
    <Cell key={item.id}>
      <Touchable hapticFeedback="impactLight" onPress={() => this.props.onSelect(item)}>
        <Image source={item.image} size={ITEM_SIZE} gutter={GUTTER}>
          <Overlay />
          <Text color="white">{item.title}</Text>
        </Image>
      </Touchable>
    </Cell>
  )

  render() {
    const { isFetching, categories } = this.props

    return (
      <FlatList
        ListEmptyComponent={isFetching && <Loader color="grey" />}
        contentContainerStyle={{
          padding: 5,
          flex: isFetching ? 1 : 0,
          paddingBottom: 30,
        }}
        numColumns={2}
        data={categories}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default compose(getProjectCategories)(ProjectCategories)
