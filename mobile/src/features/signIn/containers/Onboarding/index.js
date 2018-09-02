import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, FlatList } from 'react-native'
import { translate } from 'react-i18next'
import { omit } from 'ramda'
import { compose } from 'react-apollo'
import { track, events } from 'utils/analytics'
import withStatusBar from 'navigation/utils/withStatusBar'
import { getProjectCategories } from 'graphql/queries/project/getProjectCategories'
import { editUser } from 'graphql/mutations/user/editUser'
import { Header, Touchable, Text, Loader } from 'ui'
import Content from 'features/signIn/components/Content'
import Footer from 'features/signIn/components/Footer'

import { Base, Cell, Image, Overlay } from './styles'

const { width } = Dimensions.get('window')

const MIN_ITEMS = 3
const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

class Onboarding extends Component {
  static propTypes = {
    editUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    categories: PropTypes.array,
  }

  state = {
    items: {},
  }

  componentDidMount() {
    track(events.USER_ONBOARDING_CATEGORIES_VIEWED)
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

  isComplete = () => {
    if (Object.keys(this.state.items).length >= MIN_ITEMS) {
      track(events.USER_ONBOARDING_CATEGORIES_SELECTED)
      return true
    }
    return false
  }

  progress = () => (Object.keys(this.state.items).length / 3) * 100

  isAdded = item => this.state.items[item.id]

  handleSubmit = () => {
    track(events.USER_ONBOARDING_CATEGORIES_DONE)
    this.props.editUser({ interestedIn: { id: '123' } })
  }

  headerRight = () => {
    if (!this.isComplete()) return null

    return (
      <Text color="white" medium opacity={1} onPress={this.handleSubmit}>
        {this.props.t('Onboarding:next')}
      </Text>
    )
  }

  renderItem = ({ item }) => (
    <Cell key={item.id}>
      <Touchable hapticFeedback="impactLight" onPress={() => this.toggleSelection(item)}>
        <Image selected={this.isAdded(item)} source={item.image} size={ITEM_SIZE} gutter={GUTTER}>
          <Overlay selected={false} />
          <Text color="white">{item.name}</Text>
        </Image>
      </Touchable>
    </Cell>
  )

  render() {
    const { isFetching, categories } = this.props

    return (
      <Base>
        <Header headerRight={this.headerRight()} />
        <FlatList
          ListHeaderComponent={<Content />}
          ListEmptyComponent={isFetching && <Loader color="grey" />}
          contentContainerStyle={{ padding: 5, flex: isFetching ? 1 : 0 }}
          numColumns={2}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
        <Footer progress={this.progress()} />
      </Base>
    )
  }
}

export default compose(
  getProjectCategories,
  editUser
)(withStatusBar(translate('Onboarding')(Onboarding), { barStyle: 'light-content' }))
