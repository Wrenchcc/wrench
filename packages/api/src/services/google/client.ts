import { OAuth2Client } from 'google-auth-library'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

export default new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
