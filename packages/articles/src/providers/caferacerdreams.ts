import rssParser from '../utils/rssParser'

const FEED_URL = 'https://www.caferacerdreams.es/en/blog/feed/'
const PROVIDER = 'caferacerdreams'

export default async () => {
  try {
    await rssParser(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
