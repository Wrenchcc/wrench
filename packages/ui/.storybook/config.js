import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { useDarkMode } from 'storybook-dark-mode'
import ThemeProvider from '../src/ThemeProvider'
import { THEMES } from '../src/theme'

function ThemeWrapper({ children }) {
  return <ThemeProvider mode={useDarkMode() ? THEMES.DARK : THEMES.LIGHT}>{children}</ThemeProvider>
}

addDecorator(renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>)

const req = require.context('../src', true, /stories(\.web|\.native)?.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
