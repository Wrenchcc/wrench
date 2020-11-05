// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgBookmarkIcon({
  width = 14,
  height = 18,
  className,
  style = {},
  onClick,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 20"
      width={width}
      height={height}
      className={className}
      style={style}
      onClick={onClick}
    >
      <path
        d="M15 19l-7-5-7 5V3a2 2 0 012-2h10a2 2 0 012 2v16z"
        stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
        strokeWidth={1.5}
        fill={props.theme.colors[props.fill] || 'none'}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default withTheme(SvgBookmarkIcon)
