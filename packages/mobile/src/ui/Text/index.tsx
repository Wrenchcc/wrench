import React, { useState, useCallback } from 'react'
import { TextStyle } from 'react-native'
import { useTranslation } from 'react-i18next'
import handleParse from './handleParse'
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
  maxText,
  ...props
}: TextProps) => {
  if (maxText) {
    const [expanded, setExpanded] = useState(false)
    const { t } = useTranslation()

    const toggleExpanded = useCallback(() => setExpanded(!expanded), [setExpanded, expanded])

    if (expanded) {
      return (
        <Base
          numberOfLines={numberOfLines}
          {...(!disabled && { onPress })}
          {...props}
          parse={handleParse}
          childrenProps={{
            style: { lineHeight },
          }}
        >
          {children}
        </Base>
      )
    }

    if (children && children.length > maxText) {
      return (
        <>
          <Base
            numberOfLines={numberOfLines}
            {...(!disabled && { onPress })}
            {...props}
            parse={handleParse}
            childrenProps={{
              style: { lineHeight },
            }}
          >{`${children.substring(0, maxText).trim()}... `}</Base>
          <Base onPress={toggleExpanded} fontSize={15} medium>
            {t('Text:more')}
          </Base>
        </>
      )
    }
  }

  return (
    <Base
      numberOfLines={numberOfLines}
      {...(!disabled && { onPress })}
      {...props}
      parse={handleParse}
      childrenProps={{
        style: { lineHeight },
      }}
    >
      {children}
    </Base>
  )
}

export default Text
