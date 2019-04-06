import { mergeAll, filter, propEq } from 'ramda'
import ExploreRoutes from 'features/explore/routes'
import FeedRoutes from 'features/feed/routes'
import NotificationsRoutes from 'features/notifications/routes'
import PostRoutes from 'features/post/routes'
import ProfileRoutes from 'features/profile/routes'
import ProjectRoutes from 'features/project/routes'
import SearchRoutes from 'features/search/routes'
import SignInRoutes from 'features/signIn/routes'
import WebViewRoutes from 'features/webview/routes'
import { TAB, MODAL, MODAL_STACK, PUBLIC } from './constants'

// NOTE: Order matters
const routes = mergeAll([
  FeedRoutes,
  ExploreRoutes,
  NotificationsRoutes,
  PostRoutes,
  ProfileRoutes,
  ProjectRoutes,
  SearchRoutes,
  SignInRoutes,
  WebViewRoutes,
])

export const tabRoutes = filter(propEq('mode', TAB), routes)
export const modalRoutes = filter(propEq('mode', MODAL), routes)
export const modalStackRoutes = filter(propEq('mode', MODAL_STACK), routes)
export const authRoutes = filter(propEq('scope', PUBLIC), routes)
export const stackRoutes = filter(({ mode }) => !mode, routes)
