// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgCloseIcon({
  width = 15,
  height = 15,
  className,
  style = {},
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 15 16" className={className} style={style}>
      <defs>
        <path
          d="M8.737 8.177l6.01 6.01a.75.75 0 11-1.06 1.06l-6.01-6.01-6.01 6.01a.75.75 0 11-1.061-1.06l6.01-6.01-6.01-6.01a.75.75 0 111.06-1.061l6.01 6.01 6.011-6.01a.75.75 0 011.06 1.06l-6.01 6.01z"
          id="close-icon_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="close-icon_svg__b" fill="#fff">
          <use xlinkHref="#close-icon_svg__a" />
        </mask>
        <use fill="#000" xlinkHref="#close-icon_svg__a" />
        <path
          fill={props.theme.colors[props.color] || props.theme.colors.inverse}
          fillRule="nonzero"
          mask="url(#close-icon_svg__b)"
          d="M7.677-13.036L28.89 8.177 7.677 29.39-13.536 8.177z"
        />
      </g>
    </svg>
  )
}

export default withTheme(SvgCloseIcon)
