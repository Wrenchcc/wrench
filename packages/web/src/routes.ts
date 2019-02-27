import Routes, * as nextRoutes from 'next-routes'

// @ts-ignore
export const routes = nextRoutes() as Routes
export const { Router } = routes
export const { Link } = routes

routes.add('project/index', '/project/:slug')
routes.add('explore/index', '/explore')
routes.add('user/index', '/:username')
