import Routes, * as nextRoutes from 'next-routes'

// @ts-ignore
export const routes = nextRoutes() as Routes
export const { Router } = routes
export const { Link } = routes

routes.add('user', '/user/:slug')
routes.add('project', '/project/:slug')
routes.add('explore', '/explore')
