import client from '../client'

export default async ({ body, index }) => client({
  body,
  path: `${index}/_search`,
})
