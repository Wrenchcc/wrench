import Config from 'react-native-config'
import S3 from './client'

const Storage = new S3({
  bucket: Config.S3_BUCKET,
  region: 'eu-central-1',
  level: 'public',
  credentials: {
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  },
})

export const put = (key, value, options = {}) => Storage.put(key, value, options)

// export const get = () => console.log('get')
// export const remove = () => console.log('remove')
