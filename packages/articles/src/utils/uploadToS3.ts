import axios from 'axios'
import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'

const AWS_S3_REGION = 'us-east-1'
const AWS_S3_BUCKET = 'wrench-files'
const UPLOAD_DIRECTORY = 'articles'

const s3 = new S3({
  region: AWS_S3_REGION,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})

export default async images => {
  try {
    const results = await Promise.all(
      images
        .map(async url => {
          const { data } = await axios.get(encodeURI(url), {
            responseType: 'arraybuffer',
          })

          const filename = `${v4()}.jpg`

          await s3
            .upload({
              Body: data,
              Bucket: AWS_S3_BUCKET,
              Key: `${UPLOAD_DIRECTORY}/${filename}`,
            })
            .promise()

          return { filename }
        })
        .map(p => p.catch(() => undefined))
    ).then(res => res)

    return results.filter(image => image !== undefined)
  } catch (err) {
    console.log(err)
  }
}
