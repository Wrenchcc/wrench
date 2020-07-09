// TODO: should come from @wrench/ui when that's typed
export type Colors = {
  default: string
  neutral: string
  accent: string
  subtle: string
  inverse: string
  error: string
  success: string
  warning: string
  facebook: string
  white: string
  black: string
  divider: string
  placeholder: string
}

// TODO: should come from @wrench/ui when that's typed
export type ThemeInterface = {
  fontSizes: Array<number>
  breakpoints: Array<string>
  fonts: {
    body: string
    heading: string
    monospace: string
  }
  fontWeights: {
    body: number
    heading: number
    bold: number
  }
  lineHeights: {
    body: number
    heading: number
  }
  mode: string
  colors: Colors
}
