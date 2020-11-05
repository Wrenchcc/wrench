// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgChevronRightIcon({
  width = 11,
  height = 18,
  className,
  style = {},
  onClick,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 10 17"
      width={width}
      height={height}
      className={className}
      style={style}
      onClick={onClick}
    >
      <path
        stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
        strokeWidth={1.5}
        d="M1 1l8 7.5L1 16"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default withTheme(SvgChevronRightIcon)
