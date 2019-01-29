import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import { Image, GUTTER, SNAP_INTERVAL } from './styles'

export default class SelectedFiles extends PureComponent {
  static propTypes = {
    selectedFiles: PropTypes.array.isRequired,
  }

  renderItem = ({ item }) => <Image source={item} />

  render() {
    const { selectedFiles } = this.props

    return (
      <FlatList
        keyExtractor={item => item.uri}
        data={selectedFiles}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
        style={{
          marginTop: 20,
          marginBottom: 30,
          marginRight: -GUTTER,
          marginLeft: -GUTTER,
        }}
      />
    )
  }
}
