declare namespace JSX {
  import { ReactNode } from 'react'

  interface AmpImg {
    alt?: string
    src?: string
    width?: string
    height?: string
    layout?: string
  }

  interface AmpAnalytics {
    type?: string
    'data-credentials'?: string
    children: ReactNode
  }

  interface IntrinsicElements {
    'amp-img': AmpImg
    'amp-analytics': AmpAnalytics
  }
}
