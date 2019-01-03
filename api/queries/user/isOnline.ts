import * as ms from 'ms'

export default async ({ lastSeen }, _, ctx) => {
  const timestamp = new Date().getTime() - new Date(lastSeen).getTime()
  return ms('1h') > timestamp
}
