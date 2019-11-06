import rssParser from '../utils/rssParser'

const FEED_URL = 'https://silodrome.com/feed/'
const PROVIDER = 'silodrome'

export default async () => {
  try {
    await rssParser(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
