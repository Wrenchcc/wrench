// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 7" {...props}>
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
