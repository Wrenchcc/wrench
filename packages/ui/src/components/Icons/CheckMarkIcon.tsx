// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgCheckMarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 13" {...props}>
      <path
        d="M17 1L6 12 1 7"
        stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default withTheme(SvgCheckMarkIcon)
