import saveArticle from '../utils/saveArticle'

const FEED_URL = 'http://deuscustoms.com/feed/'
const PROVIDER = 'deuscustoms'

// NOTE: Fails on images
export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
