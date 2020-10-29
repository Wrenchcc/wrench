import * as React from 'react'

function SvgFacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 22" {...props}>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 1H9a5 5 0 00-5 5v3H1v4h3v8h4v-8h3l1-4H8V6a1 1 0 011-1h3V1z"
      />
    </svg>
  )
}

export default SvgFacebookIcon
