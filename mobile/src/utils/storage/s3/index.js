import { client } from 'graphql/createClient'
import { preSignUrlsMutation } from 'graphql/mutations/upload/preSignUrls'
import makeS3Request from './makeS3Request'

export const upload = async files => {
  const input = files.map(({ filename }) => ({ filename }))

  const { data } = await client.mutate({
    mutation: preSignUrlsMutation,
    variables: { input },
  })

  return Promise.all(
    data.preSignUrls.map(async ({ url, filename, type }, index) => {
      const { uri } = files[index]
      const file = { uri, filename, type }
      return makeS3Request(url, file, index)
    })
  )
}
