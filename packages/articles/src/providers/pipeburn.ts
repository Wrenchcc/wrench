import rssParser from '../utils/rssParser'

const FEED_URL = 'https://www.pipeburn.com/home/rss.xml'
const PROVIDER = 'pipeburn'

export default async () => {
  try {
    await rssParser(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
