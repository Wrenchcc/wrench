import React from 'react'
import { Text } from 'react-native'
import Touchable from 'ui/Touchable'
import PlatformColor from 'ui/PlatformColor'
import { FONTS } from 'ui/constants'

type TitleProps = {
  children: React.ReactElement
  numberOfLines?: number
  style?: Record<string, any>
  large?: boolean
  onPress?: () => void
  onLongPress?: () => void
  disabled?: boolean
  color?: string
  medium?: boolean
  fontSize?: number
}

function Title({
  children,
  numberOfLines = 2,
  style = {},
  large,
  onPress,
  onLongPress,
  disabled = false,
  color,
  medium,
  fontSize,
  ...props
}: TitleProps) {
  const baseStyle = {
    fontFamily: FONTS.MEDIUM,
    color: color ? PlatformColor[color] : PlatformColor.inverse,
    fontSize: (medium && 36) || (large && 48) || 21,
  }

  return onPress ? (
    <Touchable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
      <Text numberOfLines={numberOfLines} style={[baseStyle, style]} {...props}>
        {children}
      </Text>
    </Touchable>
  ) : (
    <Text numberOfLines={numberOfLines} style={[baseStyle, style]} {...props}>
      {children}
    </Text>
  )
}

export default Title
