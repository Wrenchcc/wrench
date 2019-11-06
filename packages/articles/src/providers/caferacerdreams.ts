import rssParser from '../utils/rssParser'
import request from '../utils/request'

const FEED_URL = 'https://www.caferacerdreams.es/en/blog/feed/'
const PROVIDER = 'caferacerdreams'

export default async () => {
  try {
    const data = await rssParser(FEED_URL, PROVIDER)
    await request(data)
  } catch (err) {
    console.log(err)
  }
}
