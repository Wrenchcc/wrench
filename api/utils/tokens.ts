import * as jwt from 'jsonwebtoken'

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

export const getUserId = req => {
  const authorization = req.headers.authorization || ''

  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    try {
      const { userId } = jwt.verify(token, ACCESS_TOKEN_SECRET)
      return userId
    } catch {
      return null
    }
  }
}

export const verifyRefreshToken = refreshToken => {
  try {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
  } catch {
    return null
  }
}

export const createAccessToken = data => jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
export const createRefreshToken = data => jwt.sign(data, REFRESH_TOKEN_SECRET, { expiresIn: '90d' })

export const generateTokens = userId => ({
  accessToken: createAccessToken({ userId }),
  refreshToken: createRefreshToken({ userId }),
})
