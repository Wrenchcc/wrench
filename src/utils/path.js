import { compose, replace, split, empty, pathOr } from 'ramda'
import { navigate } from 'navigation'

export const getActionForPathAndParams = url => compose(
  path => {
    const routeName = pathOr(null, [0], path)

    const paramsProject = { project: { slug: pathOr(null, [1], path) } }
    console.log(paramsProject)

    const paramsUser = { user: { username: pathOr(null, [1], path) } }

    return navigate(routeName, paramsUser)
  },
  split('/'),
  replace('https://wrench.cc/', empty(url))
)(url)
