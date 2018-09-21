import cropImage from 'utils/image/cropImage'
import getPreSignedUrls from './getPreSignedUrls'
import makeS3Request from './makeS3Request'

// TODO: 3. Upload images, 4. return data, 5. Clear store
export const upload = async files => {
  try {
    const [preSignedUrls, resizedImages] = await Promise.all([
      getPreSignedUrls(files),
      Promise.all(files.map(cropImage)),
    ])

    resizedImages.map(async (uri, index) => {
      const data = preSignedUrls[index]
      return makeS3Request(data, uri)
    })
  } catch (err) {
    console.log('err', err)
  }
}
