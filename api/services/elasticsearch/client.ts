import axios from 'axios'

const { ELASTICSEARCH_URL } = process.env

export default axios.create({
  baseURL: ELASTICSEARCH_URL,
})
