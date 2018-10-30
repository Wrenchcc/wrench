import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import { InfiniteList, Text, Touchable } from 'ui'
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
    return (
      <Touchable
        onPress={() => onPress(item.node)}
        style={{
          height: 70,
          justifyContent: 'center',
        }}
      >
        <Text medium style={{ marginBottom: 3 }}>{`${item.node.brand} ${item.node.model}`}</Text>
        <Text fontSize={15} color="light_grey">
          {item.node.year}
        </Text>
      </Touchable>
    )
  }

  render() {
    const { query, models, fetchMore, isFetching, hasNextPage } = this.props
    if (!query) return null

    return (
      <View style={styles.container}>
        <InfiniteList
          defaultPadding
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          data={models}
          fetchMore={fetchMore}
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
