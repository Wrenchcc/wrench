import React from 'react'
import PropTypes from 'prop-types'
import { FlatList as RNFlatList } from 'react-native'
import withKeyboardHandler from 'ui/helpers/withKeyboardHandler'

const FlatList = props => (
  <RNFlatList
    style={{ flex: 1 }}
    ref={props.scrollRef}
    keyboardShouldPersistTaps="always"
    keyboardDismissMode="on-drag"
    contentContainerStyle={{
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: (props.defaultPaddingTop && 50) || 0,
      paddingBottom: (props.paddingBottom && props.paddingBottom) || 0,
    }}
    {...props}
  />
)

FlatList.propTypes = {
  scrollRef: PropTypes.func.isRequired,
  defaultPaddingTop: PropTypes.bool,
  paddingBottom: PropTypes.number,
}

export default withKeyboardHandler(FlatList)
