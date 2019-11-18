// @ts-nocheck
import React, { memo } from 'react'
import LazyLoad from 'react-lazyload'
import { Base, Picture } from './styles'

const Image = memo(function Image({
  width,
  height,
  borderRadius,
  placeholderColor,
  style,
  source,
  lazy = true,
  placeholderDensity = 8,
  ...props
}) {
  const src = `${source}?w=${width}&h=${height}`
  const placeholder = `${source}?w=${Math.round(width / placeholderDensity)}&h=${Math.round(
    height / placeholderDensity
  )}&dpr=1`

  return (
    <Base
      width={width}
      height={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
      {...props}
    >
      {lazy ? (
        <LazyLoad
          once
          placeholder={<img src={placeholder} style={{ width: '100%', filter: 'blur(1vw)' }} />}
        >
          <Picture>
            <source
              srcSet={`${src}&webp=1 1x, ${src}&dpr=2&webp=1 2x, ${src}&dpr=3&webp=1 3x`}
              type="image/webp"
            />
            <source
              srcSet={`${src}?dpr=1 1x, ${src}&dpr=2 2x, ${src}&dpr=3 3x`}
              type="image/jpeg"
            />
            <img src={`${src}?dpr=1`} />
          </Picture>
        </LazyLoad>
      ) : (
        <Picture>
          <source
            srcSet={`${src}&webp=1 1x, ${src}&dpr=2&webp=1 2x, ${src}&dpr=3&webp=1 3x`}
            type="image/webp"
          />
          <source srcSet={`${src}?dpr=1 1x, ${src}&dpr=2 2x, ${src}&dpr=3 3x`} type="image/jpeg" />
          <img src={`${src}?dpr=1`} />
        </Picture>
      )}
    </Base>
  )
})

export default Image
