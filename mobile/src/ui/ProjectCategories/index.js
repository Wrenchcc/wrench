import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, FlatList } from 'react-native'
import { omit } from 'ramda'
import { compose } from 'react-apollo'
import { getProjectCategories } from 'graphql/queries/project/getProjectCategories'
import { Touchable, Text, Loader } from 'ui'

import { Cell, Image, Overlay } from './styles'

const { width } = Dimensions.get('window')

const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

class ProjectCategories extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    categories: PropTypes.array,
  }

  state = {
    items: {},
  }

  toggleSelection = item => {
    if (this.isAdded(item)) {
      this.setState(prevState => ({ items: omit([item.id], prevState.items) }))
    } else {
      this.setState(prevState => ({
        items: {
          ...prevState.items,
          [item.id]: item,
        },
      }))
    }
  }

  isAdded = item => this.state.items[item.id]

  renderItem = ({ item }) => (
    <Cell key={item.id}>
      <Touchable hapticFeedback="impactLight" onPress={() => this.toggleSelection(item)}>
        <Image selected={this.isAdded(item)} source={item.image} size={ITEM_SIZE} gutter={GUTTER}>
          <Overlay selected={false} />
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
        contentContainerStyle={{ padding: 5, flex: isFetching ? 1 : 0 }}
        numColumns={2}
        data={categories}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default compose(getProjectCategories)(ProjectCategories)
