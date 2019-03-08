import Routes, * as nextRoutes from 'next-routes'

// @ts-ignore
export const routes = nextRoutes() as Routes
export const { Router } = routes
export const { Link } = routes

routes.add('project/index', '/project/:slug')
routes.add('followers/index', '/project/:slug/followers')
routes.add('explore/index', '/explore')
routes.add('download', '/download')
routes.add('about', '/about')
routes.add('press', '/press')
routes.add('terms', '/terms')
routes.add('policy', '/policy')
routes.add('cookies', '/cookies')
routes.add('gdpr', '/gdpr')
routes.add('settings', '/settings')

// Need to be last for matching
routes.add('user/index', '/:username')
