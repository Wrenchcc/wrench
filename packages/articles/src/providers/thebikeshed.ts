import rssParser from '../utils/rssParser'
import request from '../utils/request'

const FEED_URL = 'https://thebikeshed.cc/feed/'
const PROVIDER = 'thebikeshed'

export default async () => {
  try {
    const data = await rssParser(FEED_URL, PROVIDER)
    await request(data)
  } catch (err) {
    console.log(err)
  }
}
