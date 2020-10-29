import * as React from 'react'

function SvgEmailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 17" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M2.8 1h14.4c.99 0 1.8.81 1.8 1.8v10.8c0 .99-.81 1.8-1.8 1.8H2.8c-.99 0-1.8-.81-1.8-1.8V2.8C1 1.81 1.81 1 2.8 1z" />
        <path d="M19 2.8l-9 6.3-9-6.3" />
      </g>
    </svg>
  )
}

export default SvgEmailIcon
