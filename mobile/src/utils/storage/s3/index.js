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
      return makeS3Request(
        url,
        { uri, filename, type },
        progress => console.log(progress) || (progress === 100 && alert('100'))
      )
    })
  )
}
