import S3 from 'aws-sdk/clients/s3'

const API_VERSION = '2006-03-01'

export default class Storage {
  /**
   * Initialize Storage with AWS configurations
   * @param {Object} options - Configuration object for storage
   */
  constructor(options) {
    this.options = options
  }

  /**
   * Put a file in S3 bucket specified to configure method
   * @param {Stirng} key - key of the object
   * @param {Object} object - File to be put in Amazon S3 bucket
   * @param {Object} [options] - { level : private|protected|public, contentType: MIME Types }
   * @return - promise resolves to object on success
   */
  async put(key, object, options) {
    const opt = { ...this.options, ...options }
    const { bucket } = opt
    const { contentType, contentDisposition, cacheControl, expires, metadata } = opt
    const type = contentType || 'binary/octet-stream'

    const prefix = this.prefix(opt)
    const finalKey = prefix + key
    const s3 = this.createS3(opt)

    const params = {
      Bucket: bucket,
      Key: finalKey,
      Body: object,
      ContentType: type,
    }
    if (cacheControl) {
      params.CacheControl = cacheControl
    }
    if (contentDisposition) {
      params.ContentDisposition = contentDisposition
    }
    if (expires) {
      params.Expires = expires
    }
    if (metadata) {
      params.Metadata = metadata
    }

    return new Promise((res, rej) => {
      s3.upload(params, (err, data) => {
        if (err) {
          rej(err)
        } else {
          res({
            key: data.Key.substr(prefix.length),
          })
        }
      })
    })
  }

  /**
   * @private
   */
  prefix(options) {
    const { level, credentials } = options

    const identityId = options.identityId || credentials.identityId
    const publicPath = identityId ? `public/${identityId}/` : 'public'
    const privatePath = 'private'
    const userPath = `user/${identityId}/`

    switch (level) {
      case 'user':
        return userPath
      case 'private':
        return privatePath
      default:
        return publicPath
    }
  }

  /**
   * @private
   */
  createS3(options) {
    const { bucket, region, credentials } = options
    return new S3({
      apiVersion: API_VERSION,
      params: { Bucket: bucket },
      region,
      credentials,
    })
  }
}
