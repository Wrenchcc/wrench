// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgSparkIcon({
  small,
  className,
  style = {},
  onClick,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  const width = small ? 10 : 18
  const height = small ? 11 : 20

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 22"
      className={className}
      style={style}
      onClick={onClick}
    >
      <path
        fill="none"
        stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 1L1 13h9l-1 8L19 9h-9z"
      />
    </svg>
  )
}

export default withTheme(SvgSparkIcon)
