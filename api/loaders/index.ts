import { createUserLoader } from './user'

export default () => ({
  userLoader: createUserLoader(),
})
