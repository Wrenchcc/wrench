import rssParser from '../utils/rssParser'

const FEED_URL = 'https://hookie.co/journal/feed/'
const PROVIDER = 'hookie'

export default async () => {
  try {
    await rssParser(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
