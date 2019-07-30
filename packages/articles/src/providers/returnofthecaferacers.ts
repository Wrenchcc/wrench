import saveArticle from '../utils/saveArticle'

const FEED_URL = 'https://www.returnofthecaferacers.com/feed/'
const PROVIDER = 'returnofthecaferacers'

export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
