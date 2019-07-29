import saveArticle from '../utils/saveArticle'

const FEED_URL = 'https://thebikeshed.cc/feed/'
const PROVIDER = 'thebikeshed'

export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
