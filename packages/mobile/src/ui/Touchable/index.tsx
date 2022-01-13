import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import evenHitSlop from 'utils/hitSlop'

export type TouchablePropsType = {
  children?: React.ReactNode
  hitSlop?: number
  onPress?: () => void
  disabled?: boolean
}

const Touchable = ({ children, hitSlop = 15, onPress, ...props }: TouchablePropsType) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} hitSlop={evenHitSlop(hitSlop)} {...props}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default Touchable
