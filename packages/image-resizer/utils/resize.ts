import * as sharp from 'sharp'

type Data = Buffer | string
type Resize = (query: Query) => (data: Data) => Promise<Buffer>

const min = (defaultNum: number, n?: number) => n && Math.min(defaultNum, n)

export interface Query {
  width?: number
  height?: number
  dpr?: number
  webp?: boolean
}

export const resize: Resize = query => async data => {
  const { width, height, webp, dpr = 1 } = query

  const image = sharp(data)
  const meta = await image.metadata()

  // TODO: Guard
  // if (meta.format !== 'jpeg') {
  //   throw new Error(`file format is not jpeg but: ${meta.format}`)
  // }

  image.rotate()

  const w = (width && min(meta.width, width * dpr)) || null
  const h = (height && min(meta.height, height * dpr)) || null

  image.resize(w, h)

  if (webp) {
    image.webp()
  }

  return await image.toBuffer()
}
