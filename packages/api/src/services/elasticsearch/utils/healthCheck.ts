import axios from 'axios'

const { ELASTICSEARCH_DOMAIN } = process.env

const ELASTICSEARCH_STATUS_PASS = 'green'

export default async function healthCheck() {
  try {
    const { data } = await axios({ url: `https://${ELASTICSEARCH_DOMAIN}/_cluster/health` })

    if (data.status === ELASTICSEARCH_STATUS_PASS) {
      return Promise.resolve()
    }

    return Promise.reject()
  } catch {
    return Promise.reject()
  }
}
