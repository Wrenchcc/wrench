// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgEmailIcon({
  width = 22,
  height = 22,
  className,
  style = {},
  onClick,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 17"
      className={className}
      style={style}
      onClick={onClick}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M2.8 1h14.4c.99 0 1.8.81 1.8 1.8v10.8c0 .99-.81 1.8-1.8 1.8H2.8c-.99 0-1.8-.81-1.8-1.8V2.8C1 1.81 1.81 1 2.8 1z" />
        <path d="M19 2.8l-9 6.3-9-6.3" />
      </g>
    </svg>
  )
}

export default withTheme(SvgEmailIcon)
