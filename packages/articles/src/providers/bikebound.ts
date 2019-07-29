import saveArticle from '../utils/saveArticle'

const FEED_URL = 'http://www.bikebound.com/feed/'
const PROVIDER = 'bikebound'

export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
