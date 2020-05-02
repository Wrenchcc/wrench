// @ts-nocheck
import * as sharp from 'sharp'

type Data = Exclude<Parameters<typeof sharp>[0], sharp.SharpOptions>

export type Query = {
  dpr?: number
  height?: number
  webp?: boolean
  width?: number
}

// return undefined if missing
const min = (defaultNum: number, n?: number): number | undefined =>
  n != null ? Math.min(defaultNum, n) : undefined

export const resize = ({ width, height, webp, dpr = 1 }: Query) => async (
  data: Data
): Promise<Buffer> => {
  const image = sharp(data)
  const meta = await image.metadata()

  image.rotate() // before removing metadata

  // resize
  const w = (width && min(meta.width, width * dpr)) || null
  const h = (height && min(meta.height, height * dpr)) || null

  // keep aspect ratio
  image.resize(w, h, {
    fit: 'inside',
    withoutEnlargement: true,
  })

  // convert
  if (webp) {
    image.webp()
  }

  return image.toBuffer()
}
