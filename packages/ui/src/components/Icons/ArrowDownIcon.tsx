// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgArrowDownIcon({
  width = 10,
  height = 5,
  className,
  style = {},
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 12 7" className={className} style={style}>
      <path
        d="M1 1l5 5 5-5"
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

export default withTheme(SvgArrowDownIcon)
