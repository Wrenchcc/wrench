import { createStore } from 'easy-peasy'
import banner from './notification'
import post from './post'
import project from './project'

export default createStore({
  banner,
  post,
  project,
})
