import axios from 'axios'

const { GOOGLE_FIREBASE_API_KEY } = process.env

const ENDPOINT = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${GOOGLE_FIREBASE_API_KEY}`
const BASE = 'https://wrench.cc'

export default async ({
  path,
  title = '',
  description = '',
  image = '',
  forcedRedirectEnabled = false,
}) => {
  const result = await axios.post(ENDPOINT, {
    dynamicLinkInfo: {
      androidInfo: {
        androidPackageName: 'com.wrench',
      },
      domainUriPrefix: 'wrench.page.link',
      iosInfo: {
        iosAppStoreId: 'TODO',
        iosBundleId: 'cc.wrench.app',
        iosCustomScheme: 'wrench',
      },
      link: `${BASE}/${path}`,
      socialMetaTagInfo: {
        socialDescription: description,
        socialImageLink: image,
        socialTitle: title,
      },
    },
    suffix: {
      option: 'SHORT',
    },
  })

  return result.data.shortLink
}
