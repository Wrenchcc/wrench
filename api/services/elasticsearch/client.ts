import axios from 'axios'

const { ELASTICSEARCH_HOST } = process.env

export default axios.create({
  baseURL: 'http://localhost:9200',
})
