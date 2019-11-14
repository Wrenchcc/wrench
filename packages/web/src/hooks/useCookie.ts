import { useState } from 'react'
import Cookie, { Cookies, CookieSetOptions } from 'services/cookie'

export const useCookie = (
  key: Cookies,
  initialValue: string = ''
): [string, (item: string, options?: CookieSetOptions) => void] => {
  const [value, setInnerValue] = useState(Cookie.get(key) || initialValue)

  const setValue = (value: string, options: CookieSetOptions = { path: '/' }) => {
    setInnerValue(value)
    Cookie.set(key, value, options)
  }

  return [value, setValue]
}
