import * as React from 'react'

function SvgCopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 22 22" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        transform="translate(1 1)"
      >
        <rect width={13} height={13} x={7} y={7} rx={2} />
        <path d="M3 13H2a2 2 0 01-2-2V2a2 2 0 012-2h9a2 2 0 012 2v1" />
      </g>
    </svg>
  )
}

export default SvgCopyIcon
