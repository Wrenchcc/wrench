import rssParser from '../utils/rssParser'

const FEED_URL = 'https://bikebrewers.com/feed/'
const PROVIDER = 'bikebrewers'

export default async () => {
  try {
    await rssParser(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
