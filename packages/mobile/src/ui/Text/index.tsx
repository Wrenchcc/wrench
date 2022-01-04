import React from 'react'
import { TextStyle } from 'react-native'
import { Base } from './styles'

type TextProps = {
  children: string
  numberOfLines?: number
  disabled?: boolean
  onPress?: () => void
  lineHeight?: number
  maxText?: number
  medium?: boolean
} & TextStyle

const Text = ({
  children,
  numberOfLines = 0,
  disabled = false,
  onPress,
  lineHeight = null,
  ...props
}: TextProps) => {
  return (
    <Base numberOfLines={numberOfLines} {...(!disabled && { onPress })} {...props}>
      {children}
    </Base>
  )
}

export default Text
