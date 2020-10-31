// @ts-nocheck
import { CloudFrontResponseHandler, CloudFrontResultResponse } from 'aws-lambda'
import * as qs from 'querystring'
import { S3 } from 'aws-sdk'
import * as sharp from 'sharp'
// import { mediaType } from '@hapi/accept'

type S3Object = S3.GetObjectOutput

const s3 = new S3()

type Query = {
  dpr?: number // Native only
  webp?: boolean // Native only
  width?: number
  quality?: number
}

const WEBP = 'image/webp'
const PNG = 'image/png'
const JPEG = 'image/jpeg'

const MIME_TYPES = [WEBP, PNG, JPEG]

const parseQuery = (querystring: string): Query => {
  const { w, webp, q, dpr } = qs.parse(querystring)

  return {
    width: parseInt(w, 10),
    webp: Boolean(webp),
    quality: parseInt(q) || 100,
    dpr: parseInt(dpr),
  }
}

const resize = async <T extends CloudFrontResultResponse>({
  s3Object,
  parsedQuery,
  result,
  headers,
}: {
  s3Object: Promise<S3Object>
  parsedQuery: Query
  result: T
  headers
}): Promise<T> => {
  try {
    const { width, webp, quality, dpr } = parsedQuery

    console.log(JSON.stringify(headers, null, 2))

    // const contentType = webp ? WEBP : mediaType(headers.accept, MIME_TYPES) || JPEG
    const contentType = webp ? WEBP : JPEG

    const upstreamBuffer = await s3Object.then((data) => data.Body).then(Buffer.from)

    const transformer = sharp(upstreamBuffer)

    transformer.rotate()

    const { width: metaWidth } = await transformer.metadata()

    if (metaWidth && metaWidth > width && !dpr) {
      transformer.resize(width)
    }

    if (dpr > 0) {
      transformer.resize(width * dpr)
    }

    if (contentType === WEBP || webp) {
      transformer.webp({ quality })
    } else if (contentType === PNG) {
      transformer.png({ quality })
    } else if (contentType === JPEG) {
      transformer.jpeg({ quality })
    }

    const buffer = await transformer.toBuffer()

    const encoding = 'base64'
    result.body = buffer.toString(encoding)
    result.bodyEncoding = encoding

    result.headers['content-type'] = [
      {
        key: 'Content-Type',
        value: webp ? WEBP : contentType,
      },
    ]

    result.headers['cache-control'] = [
      {
        key: 'cache-control',
        value: 'max-age=31536000',
      },
    ]

    return result
  } catch (e) {
    result.status = '403'
    result.headers['content-type'] = [
      {
        key: 'Content-Type',
        value: 'text/plain',
      },
    ]

    result.body = e.toString()

    return result
  }
}

export const originResponse: CloudFrontResponseHandler = async ({
  Records: [
    {
      cf: {
        request: { headers, uri, querystring },
        response,
      },
    },
  ],
}) => {
  const result = response as CloudFrontResultResponse

  switch (response.status) {
    case '200':
      break
    case '404':
      result.status = '404'
      result.headers['content-type'] = [
        {
          key: 'Content-Type',
          value: 'text/plain',
        },
      ]

      result.body = `${uri} is not found.`
      return result
    case '304':
    default:
      return response
  }

  const {
    host: [{ value: hostname }],
  } = headers

  const domainRegex = /\.s3\.amazonaws\.com$/

  const parsedQuery = parseQuery(querystring)

  if (!domainRegex.test(hostname)) {
    throw new Error(`invalid S3 hostname: ${hostname}`)
  }

  const bucket = hostname.replace(domainRegex, '')
  const key = uri.slice(1)

  try {
    const s3Object = s3.getObject({ Bucket: bucket, Key: key }).promise()

    return resize({ s3Object, parsedQuery, result, headers })
  } catch (err) {
    console.log('S3 error', err)
  }
}
