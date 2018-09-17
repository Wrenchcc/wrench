import S3 from 'aws-sdk/clients/s3'
import Config from 'react-native-config'

const AWS_API_VERSION = '2006-03-01'
const AWS_SIGNATURE_VERSION = 'v4'

const s3 = new S3({
  apiVersion: AWS_API_VERSION,
  signatureVersion: AWS_SIGNATURE_VERSION,
  region: Config.WRENCH_AWS_S3_REGION,
  // useAccelerateEndpoint: true,
  params: {
    Bucket: Config.WRENCH_AWS_S3_BUCKET,
  },
})

/**
 * Put a file in S3 bucket specified to configure method
 * @param {String} key - key of the object
 * @param {Object} body - File to be put in Amazon S3 bucket
 * @return - promise resolves to object on success
 */
export const put = async (key, body, options) => {
  const { contentType } = options
  const type = contentType || 'binary/octet-stream'

  const prefix = 'original/'
  const finalKey = `${prefix}${key}`

  const params = {
    Bucket: Config.WRENCH_AWS_S3_BUCKET,
    Key: finalKey,
    Body: body,
    ContentType: type,
  }

  return new Promise((res, rej) => {
    s3.upload(params, (err, data) => {
      if (err) {
        // console.log('error uploading', err)
        rej(err)
      } else {
        res({
          key: data.Key.substr(prefix.length),
        })
      }
    }).on('httpUploadProgress', evt => {
      // Here you can use `this.body` to determine which file this particular
      // event is related to and use that info to calculate overall progress.
      console.log(`Uploaded: ${parseInt((evt.loaded * 100) / evt.total)}%`)
    })
  })
}
