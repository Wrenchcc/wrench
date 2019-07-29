import saveArticle from '../utils/saveArticle'

const FEED_URL = 'https://bikebrewers.com/feed/'
const PROVIDER = 'bikebrewers'

export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
