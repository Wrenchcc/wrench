import { mergeAll, filter, propEq } from 'ramda'
import SignInRoutes from 'features/signIn/routes'
import FeedRoutes from 'features/feed/routes'
import ExploreRoutes from 'features/explore/routes'
import NotificationsRoutes from 'features/notifications/routes'
import ProfileRoutes from 'features/profile/routes'
import ProjectRoutes from 'features/project/routes'
import SearchRoutes from 'features/search/routes'
import WebViewRoutes from 'features/webview/routes'
import { TAB, MODAL, PUBLIC } from './constants'

const routes = mergeAll([
  SignInRoutes,
  ProjectRoutes,
  FeedRoutes,
  ExploreRoutes,
  NotificationsRoutes,
  ProfileRoutes,
  SearchRoutes,
  WebViewRoutes,
])

export const tabRoutes = filter(propEq('mode', TAB), routes)
export const modalRoutes = filter(propEq('mode', MODAL), routes)
export const authRoutes = filter(propEq('scope', PUBLIC), routes)
export const stackRoutes = filter(({ mode }) => !mode, routes)
