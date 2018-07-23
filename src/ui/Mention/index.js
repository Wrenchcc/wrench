import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { filter, isEmpty } from 'ramda'
import { InfiniteList, MentionUser } from 'ui'
import users from 'fixtures/users'

// TODO: Make plaform speific
// And same offset on comments and posts
const OFFSET = 268
const ITEM_HEIGHT = 70

const styles = {
  container: {
    width: '100%',
    top: 0,
    bottom: OFFSET,
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
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(filter(a => a.fullName.toLowerCase().includes(nextProps.query), users))) {
      this.props.onNoResults()
    }
  }

  render() {
    const { onPress, query } = this.props
    return (
      <View style={styles.container}>
        <InfiniteList
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
}
