import rssParser from '../utils/rssParser'
import request from '../utils/request'

const FEED_URL = 'https://www.returnofthecaferacers.com/feed/'
const PROVIDER = 'returnofthecaferacers'

export default async () => {
  try {
    const data = await rssParser(FEED_URL, PROVIDER)
    await request(data)
  } catch (err) {
    console.log(err)
  }
}
