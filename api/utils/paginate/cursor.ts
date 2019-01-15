import { encode, decode } from 'base-64'

const SEPARATION_TOKEN = '___'

export const encodeCursor = (id, columnValue) => encode(`${id}${SEPARATION_TOKEN}${columnValue}`)

export const decodeCursor = cursor => {
  const data = decode(cursor).split(SEPARATION_TOKEN)

  if (data[0] === undefined || data[1] === undefined) {
    throw new Error(`Could not find edge with cursor ${cursor}`)
  }

  return data
}
