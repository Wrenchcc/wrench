import React from 'react'
import { TextStyle, Text as RNText } from 'react-native'
import PlatformColor from 'ui/PlatformColor'
import { FONTS } from 'ui/constants'

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
  style = {},
  ...props
}: TextProps) => {
  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: (props.bold && FONTS.BOLD) || (props.medium ? FONTS.MEDIUM : FONTS.REGULAR),
          textAlign: props.center ? 'center' : 'left',
          fontSize: props.fontSize ? props.fontSize : 17,
          textDecorationLine: props.underline ? 'underline' : 'none',
          opacity: props.opacity ? props.opacity : 1,
          color: props.color ? PlatformColor[props.color] : PlatformColor.inverse,
        },
        style,
      ]}
      {...(!disabled && { onPress })}
      {...props}
    >
      {children}
    </RNText>
  )
}

export default Text
