import S3 from 'aws-sdk/clients/s3'

const API_VERSION = '2006-03-01'

export default class Storage {
  options

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

    const params: any = {
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
          console.log('error uploading', err)
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

  /**
   * Remove the object for specified key
   * @param {String} key - key of the object
   * @param {Object} [options] - { level : private|protected|public }
   * @return - Promise resolves upon successful removal of the object
   */
  async remove(key, options) {
    const opt = { ...this.options, ...options }
    const { bucket } = opt

    const prefix = this.prefix(opt)
    const finalKey = prefix + key
    const s3 = this.createS3(opt)

    const params = {
      Bucket: bucket,
      Key: finalKey,
    }

    return new Promise((res, rej) => {
      s3.deleteObject(params, (err, data) => {
        if (err) {
          rej(err)
        } else {
          res(data)
        }
      })
    })
  }

  /**
   * @private
   */
  prefix(options) {
    const { credentials, level } = options

    const customPrefix = options.customPrefix || {}
    const identityId = options.identityId || credentials.identityId
    const privatePath = `${(customPrefix.private !== undefined
      ? customPrefix.private
      : 'private/') + identityId}/`
    const protectedPath = `${(customPrefix.protected !== undefined
      ? customPrefix.protected
      : 'protected/') + identityId}/`
    const publicPath = customPrefix.public !== undefined ? customPrefix.public : 'public/'

    switch (level) {
      case 'private':
        return privatePath
      case 'protected':
        return protectedPath
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
