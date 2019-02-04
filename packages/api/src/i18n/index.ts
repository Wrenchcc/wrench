import { DEFAULT_LOCALE } from '../utils/locale'
import translations from './translations'

export function translate({ key, params = {}, locale = DEFAULT_LOCALE }) {
  return translations(params)[locale][key]
}
