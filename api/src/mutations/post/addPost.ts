import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'
import posts from '../../fixtures/posts'
const debug = require('debug')('api:server')

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET, AWS_REGION } = process.env

const AWS_SIGNATURE_VERSION = 'v4'

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  signatureVersion: AWS_SIGNATURE_VERSION,
})

const generateFileName = mimetype => {
  const id = v4()

  switch (mimetype) {
    case 'image/jpeg':
      return `${id}.jpeg`
    default:
      return
  }
}

const processUpload = async upload => {
  const { stream, mimetype } = await upload

  const fileName = generateFileName(mimetype)

  const res = await s3
    .upload({
      Key: fileName,
      Bucket: AWS_S3_BUCKET,
      Body: stream,
    })
    .promise()

  return {
    uri: res.Location,
    fileName,
  }
}

// TODO: Check if user data
export default async (_, { input }, ctx) => {
  const data = await Promise.all(input.files.map(processUpload))

  debug('%O', data)

  return posts()[0].node
}
