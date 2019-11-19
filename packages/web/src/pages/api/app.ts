import MobileDetect from 'mobile-detect'

export default async function handle(req, res) {
  const detect = new MobileDetect(req.headers['user-agent'])

  if (detect.is('iPhone')) {
    res.writeHead(301, {
      Location: 'https://apps.apple.com/us/app/id1450213123',
    })
  }

  if (detect.is('Android')) {
    res.writeHead(301, {
      Location: 'https://play.google.com/store/apps/details?id=com.wrench',
    })
  }

  res.writeHead(301, {
    Location: '/',
  })

  res.end()
}
