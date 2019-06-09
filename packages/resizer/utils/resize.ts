import * as sharp from 'sharp'

type Data = Buffer | string
type Resize = (query: Query) => (data: Data) => Promise<Buffer>

const min = (defaultNum: number, n?: number) => n && Math.min(defaultNum, n)

export interface Query {
  dpr?: number
  height?: number
  webp?: boolean
  width?: number
}

export const resize: Resize = query => async data => {
  const { width, height, webp, dpr = 1 } = query

  const image = sharp(data)
  const meta = await image.metadata()

  image.rotate()

  const w = (width && min(meta.width, width * dpr)) || null
  const h = (height && min(meta.height, height * dpr)) || null

  image.resize(w, h)

  if (webp) {
    image.webp()
  }

  return image.toBuffer()
}
