import rssParser from '../utils/rssParser'

const FEED_URL = 'http://www.bikebound.com/feed/'
const PROVIDER = 'bikebound'

export default async () => {
  try {
    await rssParser(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
