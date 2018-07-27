import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { filter, isEmpty } from 'ramda'
import { Gateway, FlatList, MentionUser } from 'ui'
import { TOTAL_HEADER_HEIGHT } from 'ui/constants'
import { isIphone } from 'utils/platform'
import users from 'fixtures/users'

// And same offset on comments and posts
const DEFAULT_OFFSET_BOTTOM = isIphone ? 345 : 122
const ITEM_HEIGHT = 70

const styles = {
  container: {
    width: '100%',
    left: 0,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1000,
  },
}

export default class Mention extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    onNoResults: PropTypes.func.isRequired,
    query: PropTypes.string,
    offsetBottom: PropTypes.number,
    offsetTop: PropTypes.number,
    destination: PropTypes.string,
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(filter(a => a.fullName.toLowerCase().includes(nextProps.query), users))) {
      this.props.onNoResults()
    }
  }

  renderMention() {
    const {
      onPress,
      query,
      offsetBottom = DEFAULT_OFFSET_BOTTOM,
      offsetTop = TOTAL_HEADER_HEIGHT,
    } = this.props

    return (
      <View style={[styles.container, { bottom: offsetBottom, top: offsetTop }]}>
        <FlatList
          defaultPadding
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          data={filter(a => a.fullName.toLowerCase().includes(query), users)}
          keyExtractor={item => item.id}
          borderSeparator
          renderItem={({ item }) => <MentionUser user={item} onPress={onPress} />}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
    )
  }

  render() {
    const { destination } = this.props
    return destination ? (
      <Gateway.Consumer into={destination}>{this.renderMention()}</Gateway.Consumer>
    ) : (
      this.renderMention()
    )
  }
}
