// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgNotificationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 21 21" {...props}>
      <path
        fill="none"
        stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 15.25H1a2.85 2.85 0 002.85-2.85V7.65a6.65 6.65 0 0113.3 0v4.75A2.85 2.85 0 0020 15.25zm-7.857 3.8a1.9 1.9 0 01-3.287 0h3.288z"
      />
    </svg>
  )
}

export default withTheme(SvgNotificationIcon)
