import React, { useState, useCallback } from 'react'
import { TextStyle } from 'react-native'
import { useTranslation } from 'react-i18next'
import PlatformColor from 'ui/PlatformColor'
import { FONTS } from 'ui/constants'
import handleParse from './handleParse'
import ParsedText from './ParsedText'
import Animated, { FadeIn } from 'react-native-reanimated'

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
  maxText,
  style = {},
  ...props
}: TextProps) => {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation('text')

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [setExpanded, expanded])

  const baseStyle = {
    fontFamily: (props.bold && FONTS.BOLD) || (props.medium ? FONTS.MEDIUM : FONTS.REGULAR),
    textAlign: props.center ? 'center' : 'left',
    fontSize: props.fontSize ? props.fontSize : 17,
    textDecorationLine: props.underline ? 'underline' : 'none',
    opacity: props.opacity ? props.opacity : 1,
    color: props.color ? PlatformColor[props.color] : PlatformColor.inverse,
  }

  if (maxText) {
    if (expanded) {
      return (
        <Animated.View entering={FadeIn.duration(200)}>
          <ParsedText
            style={[baseStyle, style]}
            numberOfLines={numberOfLines}
            {...(!disabled && { onPress })}
            {...props}
            parse={handleParse}
            childrenProps={{
              style: { lineHeight },
            }}
          >
            {children}
          </ParsedText>
        </Animated.View>
      )
    }

    if (children && children.length > maxText) {
      return (
        <>
          <ParsedText
            style={[baseStyle, style]}
            numberOfLines={numberOfLines}
            {...(!disabled && { onPress })}
            {...props}
            parse={handleParse}
            childrenProps={{
              style: { lineHeight },
            }}
          >{`${children.substring(0, maxText).trim()}... `}</ParsedText>
          <ParsedText
            style={[baseStyle, style, { fontFamily: FONTS.MEDIUM }]}
            onPress={toggleExpanded}
            fontSize={15}
          >
            {t('more')}
          </ParsedText>
        </>
      )
    }
  }

  return (
    <ParsedText
      style={[baseStyle, style]}
      numberOfLines={numberOfLines}
      {...(!disabled && { onPress })}
      {...props}
      parse={handleParse}
      childrenProps={{
        style: { lineHeight },
      }}
    >
      {children}
    </ParsedText>
  )
}

export default Text
