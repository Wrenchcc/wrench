import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import ThemeProvider from '../src/ThemeProvider'
import { THEMES } from '../src/theme'

function ThemeWrapper(props) {
  return (
    <ThemeProvider mode={useDarkMode() ? THEMES.DARK : THEMES.LIGHT}>
      {props.children}
    </ThemeProvider>
  )
}

export const decorators = [(renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>]
