import { client } from 'graphql/createClient'
import { preSignUrlsMutation } from 'graphql/mutations/upload/preSignUrls'
import makeS3Request from './makeS3Request'

// TODO: Figure out what data should be sent, new photos has only uri:s
export const upload = async files => {
  const uris = Object.keys(files)
  const filenames = uris.map(uri => ({ filename: files[uri].filename }))

  const preSignedUrls = await client.mutate({
    mutation: preSignUrlsMutation,
    variables: { input: filenames },
  })

  // Return filenames
  const result = await Promise.all(
    uris.map(async (uri, index) => {
      const { url, type, filename } = preSignedUrls.data.preSignUrls[index]
      return makeS3Request(url, { uri, type, filename })
    })
  )

  return result
}
