import axios from 'axios'
import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'

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
    const results = await Promise.all(
      images.map(async url => {
        const { data } = await axios.get(url, {
          responseType: 'arraybuffer',
        })

        if (!data) {
          return
        }

        const filename = `${v4()}.jpg`

        await s3
          .upload({
            Body: data,
            Bucket: AWS_S3_BUCKET,
            Key: `${UPLOAD_DIRECTORY}/${filename}`,
          })
          .promise()

        return { filename }
      }).map(p => p.catch(() => undefined))).then(res => res);
    )

    return results.filter(image => image !== undefined)
  } catch (err) {
    console.log(err)
  }
}
