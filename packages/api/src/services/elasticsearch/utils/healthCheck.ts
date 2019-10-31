import axios from 'axios'

const { ELASTICSEARCH_DOMAIN } = process.env

export default async function healthCheck() {
  try {
    const { data } = await axios({ url: `https://${ELASTICSEARCH_DOMAIN}/_cluster/health` })

    if (data.status === 'green') {
      return Promise.resolve()
    }

    return Promise.reject()
  } catch {
    return Promise.reject()
  }
}
