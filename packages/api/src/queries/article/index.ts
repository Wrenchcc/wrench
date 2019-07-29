import article from './article'
import articles from './articles'
import author from './author'
import publisher from './publisher'
import filesConnection from './filesConnection'

export default {
  Article: {
    author,
    filesConnection,
    publisher,
  },
  Query: {
    article,
    articles,
  },
}
