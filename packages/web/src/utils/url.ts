export const withHttp = url => (!/^https?:\/\//i.test(url) ? `http://${url}` : url)
