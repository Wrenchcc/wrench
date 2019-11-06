import rssParser from '../utils/rssParser'

const FEED_URL = 'http://www.bikeexif.com/feed'
const PROVIDER = 'bikeexif'

export default async () => {
  try {
    await rssParser(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
