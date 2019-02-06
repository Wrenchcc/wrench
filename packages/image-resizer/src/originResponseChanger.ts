const http = require('http')
const https = require('https')
const querystring = require('querystring')
const Sharp = require('sharp')
const AWS = require('aws-sdk')

const S3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'eu-central-1',
})

// set the S3 and API GW endpoints
const BUCKET = '[YOUR BUCKET NAME HERE]'
const $mainRegex = '' // new RegExp('^([a-z\-]+)\/(?:([0-9]{2,4})x([0-9]{2,4}))\/(.+\/)?([A-Za-z\-\_0-9]+[A-Za-z0-9])\.([a-zA-Z]+));

exports.handler = (event, context, callback) => {
  const response = event.Records[0].cf.response
  // check if image is not present
  if (response.status == 403) {
    const request = event.Records[0].cf.request
    const params = querystring.parse(request.querystring)
    // if there is no dimension attribute, just pass the response
    if (!params.d) {
      callback(null, response)
      return
    }
    // read the required path. Ex: uri /images/100x100/webp?/image.jpg
    const path = request.uri
    // read the S3 key from the path variable.
    // Ex: path variable /images/100x100/webp?/image.jpg
    const key = path.substring(1)
    // parse the prefix, width, height and image name
    // Ex: key=images/200x200/webp?/image.jpg
    let prefix
    let originalPath
    let originalKey
    let match
    let width
    let height
    let requiredFormat
    let imageName
    let startIndex
    match = key.match($mainRegex)
    prefix = match[1]
    originalPath = match[4] ? match[4] : ''
    width = parseInt(match[2], 10)
    height = parseInt(match[3], 10)
    // correction for jpg required for 'Sharp'
    requiredFormat = match[6] == 'jpg' ? 'jpeg' : match[6]
    imageName = match[5]
    originalKey = `${originalPath + imageName}.${match[6]}`
    console.log(
      'Matched data: %s, %s, %s, %s, %s, %s, %s',
      prefix,
      width,
      height,
      originalPath,
      imageName,
      requiredFormat,
      originalKey
    )
    // get the source image file
    S3.getObject({ Bucket: BUCKET, Key: originalKey })
      .promise()
      // perform the resize operation
      .then(data => Sharp(data.Body)
        .resize(width, height)
        .toFormat(requiredFormat)
        .toBuffer())
      .then(buffer => {
        // save the resized object to S3 bucket with appropriate object key.
        S3.putObject({
          Body: buffer,
          Bucket: BUCKET,
          ContentType: `image/${requiredFormat}`,
          CacheControl: 'max-age=31536000',
          Key: key,
          StorageClass: 'STANDARD',
        })
          .promise()
          // even if there is exception in saving the object we send back the generated
          // image back to viewer below
          .catch(() => {
            console.log('Exception while writing resized image to bucket')
          })
        // generate a binary response with resized image
        response.status = 200
        response.body = buffer.toString('base64')
        response.bodyEncoding = 'base64'
        response.headers['content-type'] = [
          { key: 'Content-Type', value: `image/${requiredFormat}` },
        ]
        callback(null, response)
      })
      .catch(err => {
        console.log('Exception while reading source image :%j', err)
      })
  } // end of if block checking response statusCode
  else {
    // allow the response to pass through
    callback(null, response)
  }
}
