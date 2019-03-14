import * as sharp from 'sharp'

type Data = Buffer | string
type Resize = (query: Query) => (data: Data) => Promise<Buffer>

export interface Query {
  width?: number
  height?: number
  webp?: boolean
}

export const resize: Resize = query => async data => {
  const image = sharp(data)
  const meta = await image.metadata()

  if (meta.format !== 'jpeg') {
    throw new Error(`file format is not jpeg but: ${meta.format}`)
  }

  image.rotate()

  const { width, height, webp } = query

  const w = min(meta.width, width)
  const h = min(meta.height, height)

  image.resize(w, h) // image.resize(w, h).max(); // keep aspect ratio

  if (webp) {
    image.webp()
  }

  return await image.toBuffer()
}

// return null if null
const min = (defaultNum: number, n?: number) => n && Math.min(defaultNum, n)
