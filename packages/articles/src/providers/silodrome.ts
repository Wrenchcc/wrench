import saveArticle from '../utils/saveArticle'

const FEED_URL = 'https://silodrome.com/feed/'
const PROVIDER = 'silodrome'

export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
