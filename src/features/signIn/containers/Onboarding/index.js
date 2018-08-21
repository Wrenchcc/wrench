import React, { Component } from 'react'
import { Dimensions, FlatList } from 'react-native'
import { omit } from 'ramda'
import { compose } from 'react-apollo'
import withStatusBar from 'navigation/utils/withStatusBar'
import { editUser } from 'graphql/mutations/user/editUser'
import withLocalization from 'i18n/withLocalization'
import { Header, Touchable, Text } from 'ui'
import getCategories from 'utils/getCategories'
import Content from 'features/signIn/components/Content'
import Footer from 'features/signIn/components/Footer'

import { Base, Cell, Image, Overlay } from './styles'

const { width } = Dimensions.get('window')

const MIN_ITEMS = 3
const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

class Onboarding extends Component {
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

  isComplete = () => Object.keys(this.state.items).length >= MIN_ITEMS

  progress = () => (Object.keys(this.state.items).length / 3) * 100

  isAdded = item => this.state.items[item.id]

  headerRight = () => {
    if (!this.isComplete()) return null

    return (
      <Text
        color="white"
        medium
        opacity={1}
        onPress={() => this.props.editUser({ interestedIn: { id: '123' } })}
      >
        {this.props.t('.next')}
      </Text>
    )
  }

  renderItem = ({ item }) => (
    <Cell key={item.id}>
      <Touchable hapticFeedback="impactLight" onPress={() => this.toggleSelection(item)}>
        <Image selected={this.isAdded(item)} source={item.image} height={ITEM_SIZE} gutter={GUTTER}>
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

export default compose(editUser)(
  withStatusBar(withLocalization(Onboarding, 'Onboarding'), { barStyle: 'light-content' })
)
