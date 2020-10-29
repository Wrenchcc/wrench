import * as React from 'react'

function SvgTwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 20" {...props}>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M23 1.01a10.886 10.886 0 01-3.14 1.535 4.47 4.47 0 00-4.978-1.25A4.494 4.494 0 0012 5.556v1.003a10.65 10.65 0 01-9-4.545s-4 9.029 5 13.041a11.613 11.613 0 01-7 2.006c9 5.016 20 0 20-11.536 0-.28-.028-.558-.08-.832A7.75 7.75 0 0023 1.01z"
      />
    </svg>
  )
}

export default SvgTwitterIcon
