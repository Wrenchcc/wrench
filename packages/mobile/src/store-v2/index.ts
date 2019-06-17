import { createStore } from 'easy-peasy'
import notification from './notification'
import post from './post'
import project from './project'

export default createStore({
  notification,
  post,
  project,
})
