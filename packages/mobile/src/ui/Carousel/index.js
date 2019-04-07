import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import Pinchable from 'react-native-pinchable'
import { IMAGE_PRIORITY } from 'ui/constants'
import { width, Wrapper, Picture, GUTTER, BAR_SPACE, SIZE } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

export default class Carousel extends PureComponent {
  static propTypes = {
    files: PropTypes.object.isRequired,
  }

  getItemLayout = (data, index) => ({
    length: SIZE,
    offset: SIZE * index,
    index,
  })

  renderItem = ({ item, index }) => {
    const { files } = this.props

    return (
      <Wrapper key={item.node.uri} first={index === 0} last={index === files.edges.length - 1}>
        <Pinchable maximumZoomScale={5}>
          <Picture
            width={SIZE}
            height={SIZE}
            source={{ uri: item.node.uri }}
            priority={index < 2 ? IMAGE_PRIORITY.HIGHT : IMAGE_PRIORITY.LOW}
            index={index}
          />
        </Pinchable>
      </Wrapper>
    )
  }

  render() {
    const files = this.props.files.edges

    return (
      <FlatList
        keyExtractor={item => item.node.id}
        getItemLayout={this.getItemLayout}
        initialNumToRender={3}
        data={files}
        scrollEnabled={files.length > 1}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        scrollThrottle={10}
        renderItem={this.renderItem}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />
    )
  }
}
