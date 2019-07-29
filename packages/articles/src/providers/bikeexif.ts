import saveArticle from '../utils/saveArticle'

const FEED_URL = 'http://www.bikeexif.com/feed'
const PROVIDER = 'bikeexif'

export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
