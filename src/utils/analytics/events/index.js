import * as commentEvents from './comment'
import * as projectEvents from './project'
import * as searchEvents from './search'
import * as userEvents from './user'

export const events = {
  ...commentEvents,
  ...projectEvents,
  ...searchEvents,
  ...userEvents,
}
