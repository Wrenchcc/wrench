import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, FlatList } from 'react-native'
import { Touchable, Zoomable } from 'ui'
import { IMAGE_PRIORITY } from 'ui/constants'
import { width, Wrapper, Picture, GUTTER, BAR_SPACE } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default class Carousel extends PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    onLongPress: PropTypes.func,
  }

  renderItem = ({ item, index }) => {
    const { onPress, disabled, onLongPress, images } = this.props

    return (
      <Wrapper
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        key={item.uri}
        first={index === 0}
        last={index === images.length - 1}
      >
        <Touchable
          onPress={onPress}
          disabled={disabled}
          activeOpacity={1}
          onLongPress={onLongPress}
        >
          <Zoomable.Element>
            <Picture
              source={{ uri: item.uri }}
              priority={index < 2 ? IMAGE_PRIORITY.HIGHT : IMAGE_PRIORITY.LOW}
              index={index}
            />
          </Zoomable.Element>
        </Touchable>
      </Wrapper>
    )
  }

  render() {
    const { images } = this.props

    return (
      <AnimatedFlatList
        keyExtractor={item => item.uri}
        data={images}
        keyboardShouldPersistTaps="always"
        scrollEnabled={images.length > 1}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        scrollThrottle={10}
        grow
        renderItem={this.renderItem}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
          overflow: 'visible',
        }}
      />
    )
  }
}
