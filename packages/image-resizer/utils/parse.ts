import * as querystring from 'querystring'
import { isArray } from 'util'
import { Query } from './resize'

// TODO: Guard dpr to max 5
export default (queryString: string): Query => {
  const value = (str?: string | string[]): string => (isArray(str) ? str[0] : str)

  const guard = (n?: number): number | null => (isFinite(n) && n > 0 ? n : null)

  const parseNum = str => guard(parseInt(value(str)))

  const { w, h, webp, dpr } = querystring.parse(queryString)

  return {
    width: parseNum(w),
    height: parseNum(h),
    dpr: parseNum(dpr),
    webp: Boolean(webp),
  }
}
