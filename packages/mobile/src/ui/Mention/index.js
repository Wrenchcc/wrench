import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import Gateway from 'ui/Gateway'
import InfiniteList from 'ui/InfiniteList'
import MentionUser from 'ui/MentionUser'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { TOTAL_HEADER_HEIGHT } from 'ui/constants'
import NoResults from 'ui/NoResults'
import { isIphone } from 'utils/platform'

// TODO: And same offset on comments and posts
// Keyboard height + input
const DEFAULT_OFFSET_BOTTOM = isIphone ? 360 : 122

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

class Mention extends Component {
  static propTypes = {
    users: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    offsetBottom: PropTypes.number,
    offsetTop: PropTypes.number,
    destination: PropTypes.string,
  }

  renderItem = ({ item }) => {
    const { onPress } = this.props
    return <MentionUser user={item.node} onPress={onPress} />
  }

  renderMention() {
    const {
      offsetBottom = DEFAULT_OFFSET_BOTTOM,
      offsetTop = TOTAL_HEADER_HEIGHT,
      users,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
    } = this.props

    return (
      <View style={[styles.container, { bottom: offsetBottom, top: offsetTop }]}>
        <InfiniteList
          defaultPadding
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          ListEmptyComponent={<NoResults />}
          data={users}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          keyExtractor={item => item.node.id}
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
