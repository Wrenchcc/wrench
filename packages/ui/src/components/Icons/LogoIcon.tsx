// @ts-nocheck
import * as React from 'react'
import { withTheme } from 'styled-components'

function SvgLogoIcon({
  theme,
  black,
  white,
  inverted,
  width = 40,
  height = 40,
  style = {},
  className,
}: React.SVGProps<SVGSVGElement>) {
  const textColor =
    (black && theme.colors.white) || (white && theme.colors.black) || theme.isDark
      ? inverted
        ? theme.colors.white
        : theme.colors.black
      : inverted
      ? theme.colors.black
      : theme.colors.white

  const bgColor =
    (black && theme.colors.black) || (white && theme.colors.white) || theme.isDark
      ? inverted
        ? theme.colors.black
        : theme.colors.white
      : inverted
      ? theme.colors.white
      : theme.colors.black

  return (
    <svg width={width} height={height} viewBox="0 0 40 40" className={className} style={style}>
      <g fill="none" fillRule="evenodd">
        <rect width={40} height={40} fill={bgColor} rx={0.667} />
        <path
          fill={textColor}
          d="M6.965 8.64l1.511 6.054h.07l1.565-6.054h1.792l1.564 6.071h.07l1.511-6.071h1.845l-2.284 9.01h-2.073l-1.494-5.649h-.07l-1.494 5.65H7.404L5.12 8.64h1.845zm16.878 9.01l-1.617-3.308H21.05v3.308h-2.04V8.64h3.462c1.063 0 1.868.25 2.414.748.546.499.82 1.188.82 2.068 0 .63-.138 1.149-.413 1.555a2.973 2.973 0 01-1.05.957l1.831 3.682h-2.231zm-2.794-7.32v2.34h1.423c.36 0 .653-.095.877-.284.224-.189.336-.481.336-.877 0-.388-.11-.68-.33-.88-.22-.2-.514-.3-.883-.3H21.05zm12.871 5.63v1.69h-6.01V8.64h6.01v1.69h-3.971v1.97h3.356v1.69h-3.356v1.971h3.971zm-19.746 6.585v9.01H12.17l-3.199-5.543h-.07v5.544H6.864v-9.01h2.02l3.181 5.543h.07v-5.544h2.039zm9.743 2.834l-1.968.281c-.132-.475-.355-.828-.67-1.06a1.813 1.813 0 00-1.105-.348 1.69 1.69 0 00-1.386.663c-.353.441-.53 1.159-.53 2.153 0 .995.177 1.707.53 2.136.353.43.815.645 1.386.645.422 0 .784-.112 1.088-.335.303-.223.52-.563.652-1.02l1.986.281c-.246.933-.705 1.65-1.375 2.152-.671.501-1.455.752-2.35.752-.762 0-1.442-.181-2.041-.543-.6-.363-1.07-.888-1.415-1.575-.344-.688-.516-1.519-.516-2.493 0-.98.172-1.815.516-2.508.344-.692.816-1.221 1.415-1.588.599-.366 1.279-.55 2.04-.55.896 0 1.683.255 2.36.766.676.51 1.137 1.24 1.383 2.19zm4.156-2.834v3.66h3.233v-3.66h2.038v9.01h-2.038v-3.66h-3.233v3.66h-2.039v-9.01h2.039z"
        />
      </g>
    </svg>
  )
}

export default withTheme(SvgLogoIcon)
