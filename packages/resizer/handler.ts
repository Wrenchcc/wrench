import {
  Callback,
  CloudFrontResponse,
  CloudFrontResponseEvent,
  CloudFrontResultResponse,
  Context,
  Handler,
} from 'aws-lambda'
import { S3 } from 'aws-sdk'

import { resize } from './utils/resize'
import parse from './utils/parse'

const resultResponse = (response: CloudFrontResponse): CloudFrontResultResponse => response

const AWS_S3_REGION = 'us-east-1'

export const originResponse: Handler = async (
  event: CloudFrontResponseEvent,
  context: Context,
  cb: Callback
) => {
  const { response, request } = event.Records[0].cf
  const result = resultResponse(response)

  const { uri } = request

  const ext = uri.split('.').pop()

  if (!ext.match(/jpe?g/)) {
    cb(null, response)
  }

  // response original
  if (!request.querystring) {
    cb(null, response)
  }

  // origin status
  switch (response.status) {
    case '200':
      // keep going
      break
    case '404':
      // response not found
      result.status = '404'
      result.headers['content-type'] = [{ key: 'Content-Type', value: 'text/plain' }]
      result.body = `${uri} is not found.`
      cb(null, result)
      return
    case '304':
    default:
      cb(null, response)
  }

  const hostname = request.headers.host[0].value
  const domainRegex = /\.s3\.amazonaws\.com$/

  if (!hostname.match(domainRegex)) {
    throw new Error(`invalid S3 hostname: ${hostname}`)
  }

  const bucket = hostname.replace(domainRegex, '')
  const key = uri.slice(1)

  const s3 = new S3({
    region: AWS_S3_REGION,
    signatureVersion: 'v4',
  })

  const s3Object = s3
    .getObject({
      Bucket: bucket,
      Key: key,
    })
    .promise()

  const query = parse(request.querystring)

  const resizeResult = await resizeS3Image({ s3Object, query, result })

  cb(null, resizeResult)
}

const resizeS3Image = ({ s3Object, query, result }) => s3Object
  .then(data => data.Body)
  .then(Buffer.from)
  .then(resize(query))
  .then(buffer => {
    // response resized image
    const encoding = 'base64'
    result.body = buffer.toString(encoding)
    result.bodyEncoding = encoding
    if (query.webp) {
      result.headers['content-type'] = [{ key: 'Content-Type', value: 'image/webp' }]
    }
    return result
  })
  .catch(err => {
    result.status = '403'
    result.headers['content-type'] = [{ key: 'Content-Type', value: 'text/plain' }]
    result.body = err.toString()

    return result
  })
