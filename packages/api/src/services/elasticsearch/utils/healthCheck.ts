import axios from 'axios'

const { ELASTICSEARCH_DOMAIN } = process.env

export default async function healthCheck() {
  try {
    const res = await axios({ url: `${ELASTICSEARCH_DOMAIN}/_cluster/health` })

    if (res.status === 200) {
      return Promise.reject()
    }
  } catch {
    return Promise.reject()
  }
}
