import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { getFollowers } from 'graphql/queries/getFollowers'
import { InfiniteList, User, HeaderTitle } from 'ui'
import data from 'fixtures/search'

let scrollView = null

// TODO: Translate header
class Followers extends Component {
  static navigationOptions = {
    headerTitle: (
      <HeaderTitle onPress={() => scrollView.scrollToOffset({ offset: 0 })}>Followers</HeaderTitle>
    ),
  }

  static propTypes = {
    posts: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <User data={item.node} />

  render() {
    const { followers, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    return (
      <InfiniteList
        scrollRef={ref => {
          scrollView = ref
        }}
        borderSeparator
        data={followers}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default compose(getFollowers)(Followers)
