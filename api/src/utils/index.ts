import * as jwt from 'jsonwebtoken'

const { APP_SECRET } = process.env

export const getUserFromRequest = req => {
  const authorization = req.headers.authorization || ''

  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    try {
      const { id } = jwt.verify(token, APP_SECRET)
      return { id }
    } catch {
      return null
    }
  }

  // No user authenticated
  return null
}

export const verifyRefreshToken = refreshToken => {
  try {
    return jwt.verify(refreshToken, APP_SECRET)
  } catch {
    return null
  }
}
