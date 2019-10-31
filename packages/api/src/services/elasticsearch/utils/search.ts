import client from '../client'

export default async ({ body, index }) =>
  client({
    body: JSON.stringify(body),
    path: `${index}/_search`,
    method: 'post',
  })
