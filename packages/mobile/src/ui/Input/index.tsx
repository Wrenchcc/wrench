import React, { useRef } from 'react'
import { COLORS } from 'ui/constants'
import { isIphone } from 'utils/platform'
import { Field } from './styles'

const DEFAULT_SELECTION_COLOR = isIphone ? COLORS.DARK : COLORS.WHITE

type Props = {
  placeholder: string
  autoFocus: boolean
  noBorder: boolean
  multiline: boolean
  selectionColor: string
  waitForRender: boolean
}

function Input({
  placeholder,
  autoFocus,
  noBorder,
  multiline = false,
  selectionColor = DEFAULT_SELECTION_COLOR,
  waitForRender,
  ...props
}: Props) {
  const ref = useRef(null)

  if (autoFocus) {
    // TODO: RNN flicker when autoFocus and push animation
    setTimeout(
      () => {
        if (ref.current) ref.current.focus()
      },
      waitForRender ? 500 : 0
    )
  }

  return (
    <Field
      ref={ref}
      placeholder={placeholder}
      placeholderTextColor={COLORS.LIGHT_GREY}
      selectionColor={selectionColor}
      noBorder={noBorder}
      multiline={multiline}
      keyboardAppearance="dark"
      underlineColorAndroid="transparent"
      {...props}
    />
  )
}

export default Input
