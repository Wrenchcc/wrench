import publisher from './publisher'
import publishers from './publishers'
import articlesConnection from './articlesConnection'

export default {
  Publisher: {
    articlesConnection,
  },
  Query: {
    publisher,
    publishers,
  },
}
