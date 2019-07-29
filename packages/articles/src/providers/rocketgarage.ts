import saveArticle from '../utils/saveArticle'

const FEED_URL = 'http://feeds.feedburner.com/blogspot/MvENa'
const PROVIDER = 'rocketgarage'

// NOTE: Fails on images
export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
