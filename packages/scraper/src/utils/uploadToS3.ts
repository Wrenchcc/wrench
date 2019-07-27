import axios from 'axios'
import { S3 } from 'aws-sdk'
import uuidv4 from 'uuid/v4'

const { AWS_S3_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const UPLOAD_DIRECTORY = 'articles'

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_S3_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})

export default async images => {
  try {
    images.map(async url => {
      const { data } = await axios.get(url, {
        responseType: 'arraybuffer',
      })

      const id = uuidv4()
      // console.log(id)
      // return s3
      //   .upload({
      //     Body: data,
      //     Bucket: AWS_S3_BUCKET,
      //     Key: `${UPLOAD_DIRECTORY}/${id}.jpg`,
      //   })
      //   .promise()
    })
  } catch (err) {
    // console.log(err)
  }
}
