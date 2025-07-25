// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgArrowRightAlternativeIcon({
  width = 44,
  height = 48,
  className,
  style = {},
  onClick,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 48"
      className={className}
      style={style}
      onClick={onClick}
    >
      <defs>
        <filter
          x="-95.3%"
          y="-190.6%"
          width="290.6%"
          height="478.1%"
          filterUnits="objectBoundingBox"
          id="arrow-right-alternative-icon_svg__a"
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
        <path id="arrow-right-alternative-icon_svg__b" d="M12 17l10 10 10-10" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g strokeLinecap="round" strokeLinejoin="round" transform="rotate(-90 23 23)">
          <use
            fill="#000"
            filter="url(#arrow-right-alternative-icon_svg__a)"
            xlinkHref="#arrow-right-alternative-icon_svg__b"
          />
          <use
            stroke={props.theme.colors[props.color] || props.theme.colors.inverse}
            strokeWidth={1.5}
            xlinkHref="#arrow-right-alternative-icon_svg__b"
          />
        </g>
        <path d="M0 2h44v44H0z" />
      </g>
    </svg>
  )
}

export default withTheme(SvgArrowRightAlternativeIcon)
