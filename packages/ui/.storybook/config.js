import React, { useState, useEffect } from 'react'
import addons from '@storybook/addons'
import { configure, addDecorator } from '@storybook/react'
import ThemeProvider from '../src/ThemeProvider'
import { THEMES } from '../src/theme'

addDecorator(storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>)

const channel = addons.getChannel()

function ThemeWrapper({ children }) {
  const [isDark, setDark] = useState(false)

  useEffect(() => {
    channel.on('DARK_MODE', setDark)
    return () => channel.off('DARK_MODE', setDark)
  }, [channel, setDark])

  return <ThemeProvider mode={isDark ? THEMES.DARK : THEMES.LIGHT}>{children}</ThemeProvider>
}

addDecorator(renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>)

const req = require.context('../src', true, /stories(\.web|\.native)?.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
