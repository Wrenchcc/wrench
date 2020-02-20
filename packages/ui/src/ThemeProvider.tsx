import React from 'react'
import { ThemeProvider as Provider } from 'styled-components'
import getTheme from './theme'

function ThemeProvider({ children, mode }) {
  return <Provider theme={getTheme(mode)}>{children}</Provider>
}

export default ThemeProvider
