import * as express from 'express'
import * as next from 'next'
// import * as nextI18NextMiddleware from 'next-i18next/middleware'
import { format, parse } from 'url'
import { routes } from './routes'
// import { nextI18next } from './i18n'

const PORT = parseInt(process.env.PORT, 10) || 3000
const DEV = process.env.NODE_ENV === 'development'

const app = next({
  dev: DEV,
  dir: __dirname,
  conf: !DEV && { poweredByHeader: false },
})

const handle = routes.getRequestHandler(app)

async function blaj() {
  await app.prepare()
  const server = express()

  // server.use(nextI18NextMiddleware(nextI18next))
  // handle any other requests
  server.get('*', (req, res) => {
    const { pathname, query } = parse(req.url, true)

    if (pathname.length > 1 && pathname.slice(-1) === '/' && pathname.indexOf('/_next/') !== 0) {
      return res.redirect(
        format({
          pathname: pathname.slice(0, -1),
          query,
        })
      )
    }
    // (req as any).hostsByLocale = {
    //   en: env.HOST_EN,
    //   ru: env.HOST_RU,
    // };
    // (req as any).gaTrackingId = env.GA_TRACKING_ID;
    // (req as any).graphqlUri = env.GRAPHQL_URI;
    // (req as any).nodeEnv = env.NODE_ENV

    return handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on port ${PORT}`)
  })
}

blaj()
