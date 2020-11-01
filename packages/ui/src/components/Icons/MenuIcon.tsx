// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgMenuIcon({
  width = 20,
  height = 18,
  className,
  style = {},
  onClick,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 18"
      className={className}
      style={style}
      onClick={onClick}
    >
      <path
        d="M21 1H1m20 8H1m20 8H1"
        fill="none"
        fillRule="evenodd"
        stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default withTheme(SvgMenuIcon)
