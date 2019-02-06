const querystring = require('querystring')

const $rootFolder = 'resized-images'
const $mainRegex = '' // new RegExp('^\/(.+\/)?([A-Za-z\-\_0-9]+[A-Za-z0-9])\.([a-zA-Z]+));
const variables = {
  allowedDimension: [
    { w: 100, h: 100 },
    { w: 200, h: 200 },
    { w: 300, h: 300 },
    { w: 400, h: 400 },
    { w: 500, h: 500 },
    { w: 600, h: 600 },
    { w: 700, h: 700 },
    { w: 800, h: 800 },
    { w: 900, h: 900 },
    { w: 1000, h: 1000 },
  ],
  defaultDimension: { w: 500, h: 500 },
  variance: 20,
}

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request
  const headers = request.headers
  console.log(request)
  // parse the querystrings key-value pairs. In our case it would be d=100x100
  const params = querystring.parse(request.querystring)
  // fetch the uri of original image
  let fwdUri = request.uri
  // if there is no dimension attribute, just pass the request
  if (!params.d || !$mainRegex.test(fwdUri)) {
    callback(null, request)
    return
  }
  // read the dimension parameter value = width x height and split it by 'x'
  const dimensionMatch = params.d.split('x')
  // set the width and height parameters
  let width = dimensionMatch[0]
  let height = dimensionMatch[1]
  // define variable to be set to true if requested dimension is allowed.
  let matchFound = false
  // calculate the acceptable variance. If image dimension is 105 and is within acceptable
  // range, then in our case, the dimension would be corrected to 100.
  const variancePercent = variables.variance / 100
  for (const dimension of variables.allowedDimension) {
    const minWidth = dimension.w - dimension.w * variancePercent
    const maxWidth = dimension.w + dimension.w * variancePercent
    if (
      (width == dimension.w && height == dimension.h)
      || (width >= minWidth && width <= maxWidth)
    ) {
      width = dimension.w
      height = dimension.h
      matchFound = true
      break
    }
  }
  console.log('Is Matched ', matchFound)
  console.log('Finded %sx%s', width, height)
  // if no match is found from allowed dimension with variance then set to default
  // dimentions.
  if (!matchFound) {
    width = variables.defaultDimension.w
    height = variables.defaultDimension.h
  }
  // parse the prefix, image name and extension from the uri.
  // In our case /images/image.jpg
  const match = fwdUri.match($mainRegex)
  console.log(match)
  const prefix = match[1] ? match[1].slice(0, -1) : ''
  const imageName = match[2]
  const extension = match[3]
  const url = []
  // build the new uri to be forwarded upstream
  url.push($rootFolder)
  url.push(`${width}x${height}`)
  if (prefix != '') {
    url.push(prefix)
  }
  url.push(`${imageName}.${extension}`)
  fwdUri = url.join('/')
  // final modified url is of format /ROOT_FOLDER/200x200/path/image.jpg
  request.uri = `/${fwdUri}`
  callback(null, request)
}
