import * as React from 'react'

function SvgSearchIcon({
  width = 12,
  height = 12,
  className,
  style = {},
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" className={className} style={style}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#6D6F76"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        transform="translate(1 1)"
      >
        <circle cx={5} cy={5} r={5} />
        <path d="M12 12L9 9" />
      </g>
    </svg>
  )
}

export default SvgSearchIcon
