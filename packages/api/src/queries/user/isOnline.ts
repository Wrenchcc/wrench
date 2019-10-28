import ms from 'ms'

export default async ({ lastSeen }) => {
  const timestamp = new Date().getTime() - new Date(lastSeen).getTime()
  return ms('1h') > timestamp
}
