import rssParser from '../utils/rssParser'

const FEED_URL = 'https://thebikeshed.cc/feed/'
const PROVIDER = 'thebikeshed'

export default async () => {
  try {
    await rssParser(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
