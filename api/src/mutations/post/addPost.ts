import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'
import posts from '../../fixtures/posts'
const debug = require('debug')('api:server')

const s3 = new S3({
  accessKeyId: 'foo',
  secretAccessKey: 'bar',
  params: {
    Bucket: 'com.prisma.s3',
  },
})

const processUpload = async upload => {
  const id = v4()
  const { stream } = await upload

  const response = await s3.upload({
    Key: id,
    ACL: 'public-read',
    Bucket: 'com.prisma.s3',
    Body: stream,
  })

  console.log(response)
}

// const storeUpload = async ({ stream }) => {
//   console.log(stream)
//
// return new Promise((resolve, reject) =>
//   stream
//     .pipe(createWriteStream(path))
//     .on('finish', () => resolve({ id, path }))
//     .on('error', reject)
// )
// }

// TODO: Check if user data
export default async (_, { input }, ctx) => {
  const data = await Promise.all(input.files.map(processUpload))

  debug('%O', data)

  return posts()[0].node
}
