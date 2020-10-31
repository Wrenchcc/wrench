// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgFacebookIcon({ width = 23, height = 23, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 22">
      <path
        fill="none"
        stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 1H9a5 5 0 00-5 5v3H1v4h3v8h4v-8h3l1-4H8V6a1 1 0 011-1h3V1z"
      />
    </svg>
  )
}

export default withTheme(SvgFacebookIcon)
