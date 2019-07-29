import article from './article'
import articles from './articles'
import author from './author'
import publisher from './publisher'
import filesConnection from './filesConnection'
import categoriesConnection from './categoriesConnection'

export default {
  Article: {
    author,
    categoriesConnection,
    filesConnection,
    publisher,
  },
  Query: {
    article,
    articles,
  },
}
