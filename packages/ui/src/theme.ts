export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
}

const darkTheme = {
  default: '#000000',
  neutral: '#6d6f76',
  accent: '#a8a8ad',
  subtle: '#e6e7e9',
  inverse: '#ffffff',
  error: '#ec6d2f',
  success: '#2db22f',
  warning: '#eec530',
}

const lightTheme = {
  default: '#ffffff',
  neutral: '#6d6f76',
  accent: '#a8a8ad',
  subtle: '#e6e7e9',
  inverse: '#000000',
  error: '#ec6d2f',
  success: '#2db22f',
  warning: '#eec530',
}

export default mode => ({
  fontSizes: [12, 14, 16, 20, 24, 32],
  breakpoints: ['40em', '52em', '64em'],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  colors: mode === THEMES.DARK ? darkTheme : lightTheme,
})
