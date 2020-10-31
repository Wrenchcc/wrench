// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgArrowLeftAlternativeIcon({
  width = 44,
  height = 48,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={height} height={width} viewBox="0 0 44 48">
      <defs>
        <filter
          x="-95.3%"
          y="-190.6%"
          width="290.6%"
          height="478.1%"
          filterUnits="objectBoundingBox"
          id="arrow-left-alternative-icon_svg__a"
        >
          <feMorphology
            radius={0.75}
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          />
          <feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feMorphology radius={1} in="SourceAlpha" result="shadowInner" />
          <feOffset in="shadowInner" result="shadowInner" />
          <feComposite
            in="shadowOffsetOuter1"
            in2="shadowInner"
            operator="out"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur stdDeviation={6} in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" in="shadowBlurOuter1" />
        </filter>
        <path id="arrow-left-alternative-icon_svg__b" d="M12 17l10 10 10-10" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g strokeLinecap="round" strokeLinejoin="round" transform="matrix(0 -1 -1 0 44 46)">
          <use
            fill="#000"
            filter="url(#arrow-left-alternative-icon_svg__a)"
            xlinkHref="#arrow-left-alternative-icon_svg__b"
          />
          <use
            stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
            strokeWidth={1.5}
            xlinkHref="#arrow-left-alternative-icon_svg__b"
          />
        </g>
        <path d="M0 2h44v44H0z" />
      </g>
    </svg>
  )
}

export default withTheme(SvgArrowLeftAlternativeIcon)
