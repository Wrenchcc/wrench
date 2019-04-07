import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, FlatList, ActivityIndicator } from 'react-native'
import withTranslation from 'i18n/withTranslation'
import { omit } from 'ramda'
import { compose } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { getProjectTypes } from 'graphql-old/queries/project/getProjectTypes'
import { editUser } from 'graphql-old/mutations/user/editUser'
import { Header, Touchable, Text, Loader } from 'ui'
import Content from 'features/signIn/components/Content'
import Footer from 'features/signIn/components/Footer'

import { Base, Cell, Image, Overlay, Picture } from './styles'

const { width } = Dimensions.get('window')

const MIN_ITEMS = 3
const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

class Onboarding extends Component {
  static propTypes = {
    editUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    types: PropTypes.array,
  }

  state = {
    isSaving: false,
    items: {},
  }

  componentDidMount() {
    track(events.USER_ONBOARDING_CATEGORIES_VIEWED)
  }

  get renderHeaderRight() {
    if (!this.isComplete) return null

    const { isSaving } = this.state

    return isSaving ? (
      <ActivityIndicator size="small" color="white" />
    ) : (
      <Text
        color="white"
        medium
        opacity={1}
        onPress={this.handleSubmit}
        hapticFeedback="impactLight"
      >
        {this.props.t('Onboarding:next')}
      </Text>
    )
  }

  get progress() {
    return (Object.keys(this.state.items).length / 3) * 100
  }

  get isComplete() {
    if (Object.keys(this.state.items).length >= MIN_ITEMS) {
      track(events.USER_ONBOARDING_CATEGORIES_SELECTED)
      return true
    }

    return false
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

  handleSubmit = () => {
    this.setState({ isSaving: true })

    track(events.USER_ONBOARDING_CATEGORIES_DONE)
    const interestedIn = Object.keys(this.state.items).map(id => ({ id }))
    this.props
      .editUser({ interestedIn })
      .then(setTimeout(() => this.setState({ isSaving: false }), 500))
  }

  renderItem = ({ item }) => (
    <Cell key={item.id}>
      <Touchable hapticFeedback="impactLight" onPress={() => this.toggleSelection(item)}>
        <Picture width={ITEM_SIZE} height={ITEM_SIZE}>
          <Image
            selected={this.isAdded(item)}
            placeholderColor="transparent"
            source={{ uri: item.imageUrl }}
            gutter={GUTTER}
            width={ITEM_SIZE}
            height={ITEM_SIZE}
          >
            <Overlay selected={false} />
            <Text color="white">{item.title}</Text>
          </Image>
        </Picture>
      </Touchable>
    </Cell>
  )

  render() {
    const { isFetching, types } = this.props

    return (
      <Base>
        <Header headerRight={this.renderHeaderRight} />
        <FlatList
          ListHeaderComponent={<Content />}
          ListEmptyComponent={isFetching && <Loader color="grey" />}
          contentContainerStyle={{ padding: 5, flex: isFetching ? 1 : 0 }}
          numColumns={2}
          data={types}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
        <Footer progress={this.progress} />
      </Base>
    )
  }
}

export default compose(
  getProjectTypes,
  editUser
)(withTranslation('Onboarding')(Onboarding))
