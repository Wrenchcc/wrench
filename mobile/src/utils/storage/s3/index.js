import gql from 'graphql-tag'
import cropImage from 'utils/image/cropImage'
import { client } from 'graphql/createClient'
import makeS3Request from './makeS3Request'

const preSignUrlsMutation = gql`
  mutation($input: [PreSignedUrlnput]!) {
    preSignUrls(input: $input) {
      url
      type
      filename
    }
  }
`

// TODO: 4. return data, 5. Clear store
export const upload = async files => {
  const uris = Object.keys(files)
  const filenames = uris.map(uri => ({ filename: files[uri].filename }))

  try {
    const [preSignedUrls, resizedImages] = await Promise.all([
      client.mutate({ mutation: preSignUrlsMutation, variables: { input: filenames } }),
      Promise.all(uris.map(cropImage)),
    ])

    resizedImages.map(async (uri, index) => {
      const { url, type } = preSignedUrls.data.preSignUrls[index]
      return makeS3Request(url, { uri, type })
    })
  } catch (err) {
    console.log('err', err)
  }
}
