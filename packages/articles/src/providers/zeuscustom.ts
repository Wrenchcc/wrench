import saveArticle from '../utils/saveArticle'

const FEED_URL = 'http://zeuscustom.shop/feed/'
const PROVIDER = 'zeuscustom'

export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
