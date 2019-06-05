import React, { useCallback } from 'react'
import NativeActionSheet from 'react-native-actionsheet'

function ActionSheet({ options = [], isOpen, onClose = () => {}, ...restProps }) {
  const selectAction = useCallback(
    index => {
      if (options[index] && typeof options[index].onSelect === 'function') {
        options[index].onSelect()
      }
      onClose()
    },
    [onClose]
  )

  const cancelButtonIndex = options.length - 1

  return (
    <NativeActionSheet
      options={options.map(item => item.name)}
      cancelButtonIndex={cancelButtonIndex}
      onPress={selectAction}
      tintcolor="black"
      {...restProps}
      ref={actionSheetReference => {
        if (actionSheetReference && isOpen) {
          actionSheetReference.show()
        }
      }}
    />
  )
}

export default ActionSheet
