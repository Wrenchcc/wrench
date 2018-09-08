import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import { Touchable, Zoomable } from 'ui'
import { IMAGE_PRIORITY } from 'ui/constants'
import { width, Wrapper, Picture, GUTTER, BAR_SPACE } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

export default class Carousel extends PureComponent {
  static propTypes = {
    images: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }

  renderItem = ({ item, index }) => {
    const { onPress, disabled, images } = this.props

    return (
      <Wrapper key={item.node.uri} first={index === 0} last={index === images.edges.length - 1}>
        <Touchable onPress={onPress} disabled={disabled} activeOpacity={1}>
          <Zoomable.Element>
            <Picture
              source={{ uri: item.node.uri }}
              priority={index < 2 ? IMAGE_PRIORITY.HIGHT : IMAGE_PRIORITY.LOW}
              index={index}
            />
          </Zoomable.Element>
        </Touchable>
      </Wrapper>
    )
  }

  render() {
    const images = this.props.images.edges

    return (
      <FlatList
        keyExtractor={item => item.node.id}
        data={images}
        scrollEnabled={images.length > 1}
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
