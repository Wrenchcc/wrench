import UniversalCookie, {
  CookieGetOptions as _CookieGetOptions,
  CookieSetOptions as _CookieSetOptions,
} from 'universal-cookie'

export enum Cookies {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  VIEWER_COUNTRY = 'viewer_country',
  SHOW_PROMO = 'show_promo',
  PREFERRED_LANGUAGE = 'preferred_language',
}

// const defaultOptions = {
//   sameSite: true,
//   secure: process.env.NODE_ENV === 'production',
//   path: '/',
// }

export type CookieGetOptions = _CookieGetOptions
export type CookieSetOptions = _CookieSetOptions

class Cookie {
  private client = new UniversalCookie()

  public init(header: string | null = null) {
    this.client = new UniversalCookie(header)

    return this.client
  }

  public get = (name: string, options?: CookieGetOptions) => this.client.get(name, options)

  public set = (name: string, value: any, options?: CookieSetOptions) =>
    this.client.set(name, value, options)

  public remove = (name: string, options?: CookieSetOptions) => this.client.remove(name, options)
}

export default new Cookie()
