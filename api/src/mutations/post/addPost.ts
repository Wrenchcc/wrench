import { createWriteStream } from 'fs'
import { v4 } from 'uuid'
import posts from '../../fixtures/posts'
const debug = require('debug')('api:server')

const uploadDir = './uploads'

const processUpload = async upload => {
  const { stream, mimetype, encoding } = await upload
  return storeUpload({ stream })
}

const storeUpload = async ({ stream }): Promise<any> => {
  const id = v4()
  const path = `${uploadDir}/${id}.jpeg`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject)
  )
}

// TODO: Check if user data
export default async (_, { input }, ctx) => {
  const data = await Promise.all(input.files.map(processUpload))

  debug('%O', data)

  return posts()[0].node
}
