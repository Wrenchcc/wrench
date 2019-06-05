import React, { forwardRef, useRef, useEffect } from 'react'
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

export default forwardRef(function Input(
  {
    placeholder,
    autoFocus,
    noBorder,
    multiline = false,
    selectionColor = DEFAULT_SELECTION_COLOR,
    waitForRender,
    ...props
  }: Props,
  ref
) {
  const inputRef = useRef(null)

  if (autoFocus) {
    // TODO: RNN flicker when autoFocus and push animation
    useEffect(() => {
      const wait = setTimeout(
        () => {
          if (inputRef.current) inputRef.current.focus()
        },
        waitForRender ? 600 : 0
      )

      return () => clearTimeout(wait)
    })
  }

  return (
    <Field
      ref={ref || inputRef}
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
})
