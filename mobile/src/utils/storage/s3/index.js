import cropImage from 'utils/image/cropImage'
import S3 from './client'
import getPreSignedUrls from './getPreSignedUrls'

// TODO: 3. Upload images, 4. return data, 5. Clear store
export const upload = async files => {
  try {
    const [preSignedUrls, resizedImages] = await Promise.all([
      getPreSignedUrls(files),
      Promise.all(files.map(cropImage)),
    ])

    console.log(preSignedUrls, resizedImages)
    // preSignedUrls.map(({ url }) => S3.upload())
  } catch (err) {
    console.log('err', err)
  }
}
