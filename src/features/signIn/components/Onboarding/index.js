import React, { Component } from 'react'
import { Dimensions, FlatList } from 'react-native'
import { omit } from 'ramda'
import { navigateToFeed } from 'navigation'
import { Header, Touchable, Text } from 'ui'
import getCategories from 'utils/getCategories'
import Content from '../Content'
import Footer from '../Footer'
import { Base, Cell, Image, Overlay } from './styles'

const { width } = Dimensions.get('window')

const MIN_ITEMS = 3
const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

export default class Onboarding extends Component {
  state = {
    items: {},
  }

  toggleSelection = item => {
    if (this.isAdded(item)) {
      this.setState({ items: omit([item.id], this.state.items) })
    } else {
      this.setState({
        items: {
          ...this.state.items,
          [item.id]: item,
        },
      })
    }
  }

  isComplete = () => Object.keys(this.state.items).length >= MIN_ITEMS

  progress = () => (this.isComplete() ? 70 : Object.keys(this.state.items).length / (3 * 90))

  isAdded = item => this.state.items[item.id]

  headerRight = () =>
    this.isComplete() && (
      <Text color="white" medium opacity={1} onPress={() => navigateToFeed()}>
        Next
      </Text>
    )

  // TODO: Change images
  renderItem = ({ item }) => (
    <Cell key={item.id}>
      <Touchable hapticFeedback="impactLight" onPress={() => this.toggleSelection(item)}>
        <Image
          selected={this.isAdded(item)}
          source={{
            uri:
              'https://scontent-arn2-1.cdninstagram.com/vp/86b5a4a8f2c194ccada6d7224efc22f6/5B4FC7F0/t51.2885-15/e35/21479952_1090442404423506_5433038908231254016_n.jpg',
          }}
          height={ITEM_SIZE}
          gutter={GUTTER}
        >
          <Overlay selected={false} />
          <Text color="white">{item.name}</Text>
        </Image>
      </Touchable>
    </Cell>
  )

  render = () => (
    <Base>
      <Header headerRight={this.headerRight()} />
      <FlatList
        ListHeaderComponent={<Content />}
        contentContainerStyle={{ padding: 5 }}
        numColumns={2}
        data={getCategories}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
      />
      <Footer progress={this.progress()} />
    </Base>
  )
}
