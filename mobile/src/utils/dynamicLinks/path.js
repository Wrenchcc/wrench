import { compose, replace, split, empty, pathOr } from 'ramda'
import { navigate } from 'navigation'

const DOMAIN = 'https://wrench.cc/'

// TODO: Map params better
export const navigateBasedOnPath = url => compose(
  path => {
    const routeName = pathOr(null, [0], path)
    let params

    const param = pathOr(null, [1], path)

    switch (routeName) {
      case 'project':
        params = { project: { slug: param } }
        break
      case 'user':
        params = { user: { username: param } }
        break
      default:
    }

    return navigate(routeName, params)
  },
  split('/'),
  replace(DOMAIN, empty(url))
)(url)
