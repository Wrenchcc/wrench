import rssParser from '../utils/rssParser'

const FEED_URL = 'https://www.returnofthecaferacers.com/feed/'
const PROVIDER = 'returnofthecaferacers'

export default async () => {
  try {
    await rssParser(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
