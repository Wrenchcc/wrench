// @ts-nocheck
import * as sharp from 'sharp'

type Data = Exclude<Parameters<typeof sharp>[0], sharp.SharpOptions>

export type Query = {
  dpr?: number
  height?: number
  webp?: boolean
  width?: number
}

export const resize = ({ width, height, webp, dpr = 1 }: Query) => async (
  data: Data
): Promise<Buffer> => {
  try {
    const image = sharp(data)

    image.rotate()

    const w = parseInt(width * dpr, 10) || null
    const h = parseInt(height * dpr, 10) || null

    console.log('size', { w, h })

    // keep aspect ratio
    image.resize(w, h, {
      fit: 'inside',
      withoutEnlargement: true,
    })

    if (webp) {
      image.webp()
    }

    // const resizedImageByteLength = Buffer.byteLength(image, 'base64');

    // The size of the resized image cannot exceed 1MB.
    // if (resizedImageByteLength >= 1 * 1024 * 1024) {
    //   console.log('Size of image is to big');
    //   // return callback(null, response);
    // }

    return image.toBuffer()
  } catch (err) {
    console.log('Sharp error', err)
  }
}
