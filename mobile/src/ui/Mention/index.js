import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import { Gateway, InfiniteList, MentionUser } from 'ui'
import { searchUsers } from 'graphql/queries/user/searchUsers'

import { isIphone } from 'utils/platform'

// And same offset on comments and posts
// Keyboard height + input
const DEFAULT_OFFSET_BOTTOM = isIphone ? 265 : 122

const styles = {
  container: {
    width: '100%',
    left: 0,
    top: 0,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1000,
  },
}

// TODO: Pass query to search
class Mention extends Component {
  static propTypes = {
    users: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    onNoResults: PropTypes.func.isRequired,
    query: PropTypes.string,
    offsetBottom: PropTypes.number,
    destination: PropTypes.string,
  }

  componentDidUpdate() {
    // if (isEmpty(filter(a => a.fullName.toLowerCase().includes(this.props.query), users))) {
    //   this.props.onNoResults()
    // }
  }

  renderItem = ({ item }) => {
    const { onPress } = this.props
    return <MentionUser user={item.node} onPress={onPress} />
  }

  renderMention() {
    const {
      query,
      offsetBottom = DEFAULT_OFFSET_BOTTOM,
      users,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
    } = this.props

    // TODO: Remove when have IDs
    return (
      <View style={[styles.container, { bottom: offsetBottom }]}>
        <InfiniteList
          defaultPadding
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          data={users}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          keyExtractor={(item, index) => item.node.id + index}
          renderItem={this.renderItem}
          borderSeparator
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

export default compose(searchUsers)(Mention)
