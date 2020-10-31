import React, { ReactElement, useEffect, useRef } from 'react'
import Head from 'next/head'

const VALID_LOADING_VALUES = ['lazy', 'eager', undefined] as const
type LoadingValue = typeof VALID_LOADING_VALUES[number]

const loaders = new Map<LoaderKey, (props: LoaderProps) => string>([['edge', edgeLoader]])

type LoaderKey = 'edge'

type ImageData = {
  deviceSizes: number[]
  imageSizes: number[]
  loader: LoaderKey
  path: string
  domains?: string[]
}

type ImageProps = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading'
> & {
  src: string
  quality?: number | string
  priority?: boolean
  loading?: LoadingValue
  unoptimized?: boolean
} & (
    | { width: number | string; height: number | string; unsized?: false }
    | { width?: number | string; height?: number | string; unsized: true }
  )

const imageData: ImageData = process.env.__NEXT_IMAGE_OPTS as any
const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
} = imageData
// sort smallest to largest
configDeviceSizes.sort((a, b) => a - b)
configImageSizes.sort((a, b) => a - b)

let cachedObserver: IntersectionObserver

function getObserver(): IntersectionObserver | undefined {
  const IntersectionObserver = typeof window !== 'undefined' ? window.IntersectionObserver : null
  // Return shared instance of IntersectionObserver if already created
  if (cachedObserver) {
    return cachedObserver
  }

  // Only create shared IntersectionObserver if supported in browser
  if (!IntersectionObserver) {
    return undefined
  }
  return (cachedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target as HTMLImageElement
          unLazifyImage(lazyImage)
          cachedObserver.unobserve(lazyImage)
        }
      })
    },
    { rootMargin: '200px' }
  ))
}

function unLazifyImage(lazyImage: HTMLImageElement): void {
  if (lazyImage.dataset.src) {
    lazyImage.src = lazyImage.dataset.src
  }
  if (lazyImage.dataset.srcset) {
    lazyImage.srcset = lazyImage.dataset.srcset
  }
  lazyImage.style.visibility = 'visible'
  lazyImage.classList.remove('__lazy')
}

function getDeviceSizes(width: number | undefined): number[] {
  if (typeof width !== 'number') {
    return configDeviceSizes
  }
  if (configImageSizes.includes(width)) {
    return [width]
  }
  const widths: number[] = []
  for (let size of configDeviceSizes) {
    widths.push(size)
    if (size >= width) {
      break
    }
  }
  return widths
}

function computeSrc(src: string, unoptimized: boolean, width?: number, quality?: number): string {
  if (unoptimized) {
    return src
  }
  const widths = getDeviceSizes(width)
  const largest = widths[widths.length - 1]
  return callLoader({ src, width: largest, quality })
}

type CallLoaderProps = {
  src: string
  width: number
  quality?: number
}

function callLoader(loaderProps: CallLoaderProps) {
  const load = loaders.get(configLoader)
  return load({ root: configPath, ...loaderProps })
}

type SrcSetData = {
  src: string
  unoptimized: boolean
  width?: number
  quality?: number
}

function generateSrcSet({ src, unoptimized, width, quality }: SrcSetData): string | undefined {
  // At each breakpoint, generate an image url using the loader, such as:
  // ' www.example.com/foo.jpg?w=480 480w, '
  if (unoptimized) {
    return undefined
  }

  return getDeviceSizes(width)
    .map((w) => `${callLoader({ src, width: w, quality })} ${w}w`)
    .join(', ')
}

type PreloadData = {
  src: string
  unoptimized: boolean
  width: number | undefined
  sizes?: string
  quality?: number
}

function generatePreload({
  src,
  width,
  unoptimized = false,
  sizes,
  quality,
}: PreloadData): ReactElement {
  // This function generates an image preload that makes use of the "imagesrcset" and "imagesizes"
  // attributes for preloading responsive images. They're still experimental, but fully backward
  // compatible, as the link tag includes all necessary attributes, even if the final two are ignored.
  // See: https://web.dev/preload-responsive-images/
  return (
    <Head>
      <link
        rel="preload"
        as="image"
        href={computeSrc(src, unoptimized, width, quality)}
        // @ts-ignore: imagesrcset and imagesizes not yet in the link element type
        imagesrcset={generateSrcSet({ src, unoptimized, width, quality })}
        imagesizes={sizes}
      />
    </Head>
  )
}

function getInt(x: unknown): number | undefined {
  if (typeof x === 'number') {
    return x
  }
  if (typeof x === 'string') {
    return parseInt(x, 10)
  }
  return undefined
}

export default function Image({
  src,
  sizes,
  unoptimized = false,
  priority = false,
  loading,
  className,
  quality,
  width,
  height,
  unsized,
  ...rest
}: ImageProps) {
  const thisEl = useRef<HTMLImageElement>(null)

  if (process.env.NODE_ENV !== 'production') {
    if (!src) {
      throw new Error(
        `Image is missing required "src" property. Make sure you pass "src" in props to the \`next/image\` component. Received: ${JSON.stringify(
          { width, height, quality, unsized }
        )}`
      )
    }
    if (!VALID_LOADING_VALUES.includes(loading)) {
      throw new Error(
        `Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(
          String
        ).join(',')}.`
      )
    }
    if (priority && loading === 'lazy') {
      throw new Error(
        `Image with src "${src}" has both "priority" and "loading=lazy" properties. Only one should be used.`
      )
    }
  }

  let lazy = loading === 'lazy'
  if (!priority && typeof loading === 'undefined') {
    lazy = true
  }

  if (typeof window !== 'undefined' && !window.IntersectionObserver) {
    // Rendering client side on browser without intersection observer
    lazy = false
  }

  useEffect(() => {
    const target = thisEl.current

    if (target && lazy) {
      const observer = getObserver()

      if (observer) {
        observer.observe(target)

        return () => {
          observer.unobserve(target)
        }
      } else {
        //browsers without intersection observer
        unLazifyImage(target)
      }
    }
  }, [thisEl, lazy])

  const widthInt = getInt(width)
  const heightInt = getInt(height)
  const qualityInt = getInt(quality)

  let divStyle: React.CSSProperties | undefined
  let imgStyle: React.CSSProperties | undefined
  let wrapperStyle: React.CSSProperties | undefined
  if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined' && !unsized) {
    // <Image src="i.png" width={100} height={100} />
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt
    const ratio = isNaN(quotient) ? 1 : quotient * 100
    wrapperStyle = {
      maxWidth: '100%',
      width: widthInt,
    }
    divStyle = {
      position: 'relative',
      paddingBottom: `${ratio}%`,
    }
    imgStyle = {
      visibility: lazy ? 'hidden' : 'visible',
      height: '100%',
      left: '0',
      position: 'absolute',
      top: '0',
      width: '100%',
      objectFit: 'cover', // React Native default
    }
  } else if (typeof widthInt === 'undefined' && typeof heightInt === 'undefined' && unsized) {
    // <Image src="i.png" unsized />
    if (process.env.NODE_ENV !== 'production') {
      if (priority) {
        // <Image src="i.png" unsized priority />
        console.warn(
          `Image with src "${src}" has both "priority" and "unsized" properties. Only one should be used.`
        )
      }
    }
  } else {
    // <Image src="i.png" />
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `Image with src "${src}" must use "width" and "height" properties or "unsized" property.`
      )
    }
  }

  // Generate attribute values
  const imgSrc = computeSrc(src, unoptimized, widthInt, qualityInt)
  const imgSrcSet = generateSrcSet({
    src,
    width: widthInt,
    unoptimized,
    quality: qualityInt,
  })

  let imgAttributes:
    | {
        src: string
        srcSet?: string
      }
    | {
        'data-src': string
        'data-srcset'?: string
      }
  if (!lazy) {
    imgAttributes = {
      src: imgSrc,
    }
    if (imgSrcSet) {
      imgAttributes.srcSet = imgSrcSet
    }
  } else {
    imgAttributes = {
      'data-src': imgSrc,
    }
    if (imgSrcSet) {
      imgAttributes['data-srcset'] = imgSrcSet
    }
    className = className ? className + ' __lazy' : '__lazy'
  }

  // No need to add preloads on the client side--by the time the application is hydrated,
  // it's too late for preloads
  const shouldPreload = priority && typeof window === 'undefined'

  return (
    <div style={wrapperStyle}>
      <div style={divStyle}>
        {shouldPreload
          ? generatePreload({
              src,
              width: widthInt,
              unoptimized,
              sizes,
              quality: qualityInt,
            })
          : ''}
        <img
          {...rest}
          {...imgAttributes}
          className={className}
          sizes={sizes}
          ref={thisEl}
          style={imgStyle}
        />
      </div>
    </div>
  )
}

//BUILT IN LOADERS

type LoaderProps = CallLoaderProps & { root: string }

function edgeLoader({ src, width }: LoaderProps): string {
  return `${src}?w=${width}`
}
