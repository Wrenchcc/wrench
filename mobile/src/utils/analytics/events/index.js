import * as commentEvents from './comment'
import * as projectEvents from './project'
import * as searchEvents from './search'
import * as userEvents from './user'
import * as ratingEvents from './rating'

export const events = {
  ...commentEvents,
  ...projectEvents,
  ...searchEvents,
  ...userEvents,
  ...ratingEvents,
}
