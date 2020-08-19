import React from 'react'
import Touchable from 'ui/Touchable'
import { Base } from './styles'

type TitleProps = {
  children: React.ReactElement
  numberOfLines?: number
  style?: Record<string, any>
  large?: boolean
  medium?: boolean
  onPress?: () => void
  onLongPress?: () => void
  disabled?: boolean
  color?: string
}

function Title({
  children,
  numberOfLines = 2,
  style = {},
  large,
  medium,
  onPress,
  onLongPress,
  disabled = false,
  ...props
}: TitleProps) {
  return onPress ? (
    <Touchable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
      <Base numberOfLines={numberOfLines} medium={medium} large={large} style={style} {...props}>
        {children}
      </Base>
    </Touchable>
  ) : (
    <Base numberOfLines={numberOfLines} medium={medium} large={large} style={style} {...props}>
      {children}
    </Base>
  )
}

export default Title
