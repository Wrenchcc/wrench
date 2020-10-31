// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgCheckMarkIcon({ width = 16, height = 16, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 13">
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
