import cropImage from 'utils/image/cropImage'
import makeS3Request from './makeS3Request'

// TODO: 3. Upload images, 4. return data, 5. Clear store
export const upload = async files => {
  try {
    // Get preSignedUrls and resized image uris
    const resizedImages = Promise.all(files.map(cropImage))

    // Upload images to s3
    resizedImages.map(async (uri, index) => {
      // const data = preSignedUrls[index]
      // return makeS3Request(data, uri)
    })
  } catch (err) {
    console.log('err', err)
  }
}
