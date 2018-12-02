import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import { Touchable, Zoomable } from 'ui'
import { IMAGE_PRIORITY } from 'ui/constants'
import { width, Wrapper, Picture, GUTTER, BAR_SPACE } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

export default class Carousel extends PureComponent {
  static propTypes = {
    files: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }

  renderItem = ({ item, index }) => {
    const { onPress, onLongPress, disabled, files } = this.props

    return (
      <Wrapper key={item.node.uri} first={index === 0} last={index === files.edges.length - 1}>
        <Touchable
          onPress={onPress}
          onLongPress={onLongPress}
          disabled={disabled}
          activeOpacity={1}
        >
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
    const files = this.props.files.edges

    return (
      <FlatList
        keyExtractor={item => item.node.id}
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
