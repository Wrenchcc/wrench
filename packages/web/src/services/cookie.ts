import UniversalCookie, {
  CookieGetOptions as _CookieGetOptions,
  CookieSetOptions as _CookieSetOptions,
} from 'universal-cookie'

export enum Cookies {
  JWT = 'jwt',
}

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
}

export default new Cookie()
