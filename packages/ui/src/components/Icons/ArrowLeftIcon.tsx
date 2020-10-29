// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgArrowLeftIcon({ width = 22, height = 17, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 22 17" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
        strokeWidth={1.5}
      >
        <path d="M21 8.5H1M9 16L1 8.5 9 1" />
      </g>
    </svg>
  )
}

export default withTheme(SvgArrowLeftIcon)
