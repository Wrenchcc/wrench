import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import { InfiniteList } from 'ui'
import { searchModels } from 'graphql/queries/project/searchModels'

const styles = {
  container: {
    bottom: 360,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1000,
  },
}

class SearchModel extends Component {
  static propTypes = {
    models: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    query: PropTypes.string,
  }

  componentDidUpdate() {
    // if (isEmpty(filter(a => a.fullName.toLowerCase().includes(this.props.query), users))) {
    //   this.props.onNoResults()
    // }
  }

  renderItem = ({ item }) => {
    const { onPress } = this.props
    return null
  }

  render() {
    const { query, models, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props
    if (!query) return null

    return (
      <View style={styles.container}>
        <InfiniteList
          defaultPadding
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          data={models}
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
}

export default compose(searchModels)(SearchModel)
