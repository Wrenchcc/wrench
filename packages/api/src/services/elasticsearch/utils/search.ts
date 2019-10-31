import client from '../client'

export default async ({ body, index }) =>
  client({
    method: 'POST',
    body: JSON.stringify(body),
    path: `${index}/_search`,
  })
