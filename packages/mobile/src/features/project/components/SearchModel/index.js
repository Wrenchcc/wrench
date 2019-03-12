import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import { InfiniteList, Text, Touchable, SearchingFor } from 'ui'
import { searchModels } from 'graphql/queries/project/searchModels'
import { isIphone } from 'utils/platform'

const DEFAULT_OFFSET_BOTTOM = isIphone ? 365 : 127

const styles = {
  container: {
    bottom: DEFAULT_OFFSET_BOTTOM,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1000,
  },
}

class SearchModel extends PureComponent {
  static propTypes = {
    models: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    query: PropTypes.string,
  }

  renderItem = ({ item }) => {
    const { onPress } = this.props
    return (
      <Touchable
        onPress={() => onPress(item.node)}
        key={item.node.id}
        style={{
          height: 70,
          justifyContent: 'center',
        }}
      >
        <Text medium style={{ marginBottom: 3 }}>{`${item.node.brand.name} ${
          item.node.model
        }`}</Text>
        <Text fontSize={15} color="light_grey">
          {item.node.year}
        </Text>
      </Touchable>
    )
  }

  render() {
    const { query, models, fetchMore, isFetching, hasNextPage, isFetchingMore } = this.props

    if (!query) return null

    return (
      <View style={styles.container}>
        <InfiniteList
          defaultPadding
          ListHeaderComponent={isFetching && <SearchingFor query={query} />}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          data={models}
          fetchMore={fetchMore}
          isFetching={false}
          hasNextPage={isFetching ? false : hasNextPage}
          keyExtractor={item => item.node.id}
          renderItem={this.renderItem}
          borderSeparator
        />
      </View>
    )
  }
}

export default compose(searchModels)(SearchModel)
