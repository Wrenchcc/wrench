import { OAuth2Client } from 'google-auth-library'

const { GOOGLE_CLIENT_ID } = process.env

export default new OAuth2Client(GOOGLE_CLIENT_ID)
