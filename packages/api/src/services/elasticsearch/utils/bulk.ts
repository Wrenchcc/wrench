import client from '../client'

export default async ({ documents }) =>
  client({
    body: documents
      .map(({ index, ...rest }) => `${JSON.stringify({ index })}\n${JSON.stringify(rest)}\n`)
      .join(''),
    path: '_bulk',
    method: 'post',
  })
