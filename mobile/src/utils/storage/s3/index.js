import cropImage from 'utils/image/cropImage'
import S3 from './client'

// TODO: 1.Request signed urls, 2. Crop images, 3. Upload images, 4. Clear store, 5. return data
export const upload = async files => {
  // Get signed Urls
  // const localImages = await Promise.all(files.map(async ({ uri }) => cropImage(uri)))
  // Upload
  //  const uploadedImages = await Promise.all(localImages.map(() => S3.upload((key: '1'), (body: '23'))))
  // Delete from ImageStore
  // Return
}
