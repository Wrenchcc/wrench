import saveArticle from '../utils/saveArticle'

const FEED_URL = 'http://www.bonnefication.com/feed/'
const PROVIDER = 'bonnefication'

// NOTE: Fails on images
export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
