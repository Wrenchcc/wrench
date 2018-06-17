import S3 from 'aws-sdk/clients/s3'

export class StorageS3 {
  options

  /**
   * Configure Storage part with aws configuration
   * @param {Object} config - Configuration of the Storage
   * @return {Object} - Current configuration
   */
  configure(options) {
    let opt = options ? options.Storage || options : {}

    if (options.aws_user_files_s3_bucket) {
      opt = {
        bucket: options.aws_user_files_s3_bucket,
        region: options.aws_user_files_s3_bucket_region,
      }
    }

    this.options = Object.assign({}, this.options, opt)

    return this.options
  }

  /**
   * Put a file in S3 bucket specified to configure method
   * @param {Stirng} key - key of the object
   * @param {Object} object - File to be put in Amazon S3 bucket
   * @param {Object} [options] - { level : private|protected|public, contentType: MIME Types }
   * @return - promise resolves to object on success
   */
  async put(key: string, object, options) {
    const opt = Object.assign({}, this.options, options)
    const { bucket, region, credentials, level, track } = opt
    const { contentType, contentDisposition, cacheControl, expires, metadata } = opt
    const type = contentType || 'binary/octet-stream'

    const prefix = this._prefix(opt)
    const final_key = prefix + key
    const s3 = this._createS3(opt)
    console.log(`put ${key} to ${final_key}`)

    const params: any = {
      Bucket: bucket,
      Key: final_key,
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

    return (
      new Promise() <
      Object >
      ((res, rej) => {
        s3.upload(params, (err, data) => {
          if (err) {
            console.log('error uploading', err)
            rej(err)
          } else {
            console.log('upload result', data)
            res({
              key: data.Key.substr(prefix.length),
            })
          }
        })
      })
    )
  }

  /**
   * Remove the object for specified key
   * @param {String} key - key of the object
   * @param {Object} [options] - { level : private|protected|public }
   * @return - Promise resolves upon successful removal of the object
   */
  async remove(key: string, options) {
    const opt = Object.assign({}, this.options, options)
    const { bucket, region, credentials, level, track } = opt

    const prefix = this._prefix(opt)
    const final_key = prefix + key
    const s3 = this._createS3(opt)
    console.log(`remove ${key} from ${final_key}`)

    const params = {
      Bucket: bucket,
      Key: final_key,
    }

    return (
      new Promise() <
      any >
      ((res, rej) => {
        s3.deleteObject(params, (err, data) => {
          if (err) {
            rej(err)
          } else {
            res(data)
          }
        })
      })
    )
  }

  /**
   * @private
   */
  _prefix(options) {
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
  _createS3(options) {
    const { bucket, region, credentials } = options
    // AWS.config.update({
    //   region,
    //   credentials,
    // })
    return new S3({
      apiVersion: '2006-03-01',
      params: { Bucket: bucket },
      region,
    })
  }
}
