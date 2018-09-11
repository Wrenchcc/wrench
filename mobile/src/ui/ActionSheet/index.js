import React from 'react'
import PropTypes from 'prop-types'
import NativeActionSheet from 'react-native-actionsheet'

const ActionSheet = ({ options = [], isOpen, onClose = () => {}, ...restProps }) => {
  const selectAction = index => {
    if (options[index] && typeof options[index].onSelect === 'function') {
      options[index].onSelect()
    }
    onClose()
  }

  const cancelButtonIndex = options.length - 1

  return (
    <NativeActionSheet
      options={options.map(item => item.name)}
      cancelButtonIndex={cancelButtonIndex}
      onPress={selectAction}
      tintColor="black"
      {...restProps}
      ref={actionSheetReference => {
        if (actionSheetReference && isOpen) {
          actionSheetReference.show()
        }
      }}
    />
  )
}

ActionSheet.propTypes = {
  options: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

export default ActionSheet
