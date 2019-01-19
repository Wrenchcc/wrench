import axios from 'axios'

const { ELASTICSEARCH_DOMAIN } = process.env

export default axios.create({
  baseURL: ELASTICSEARCH_DOMAIN,
})
