import * as StoreReview from 'expo-store-review'
import { track, events } from 'utils/analytics'

export const askForRating = () => {
  track(events.RATING_OPEN_INITED)

  return StoreReview.requestReview()
}
