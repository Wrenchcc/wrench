// Taken from https://github.com/kadirahq/graphql-errors

export const IsUserError = Symbol('IsUserError')

export default class UserError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'Error'
    this.message = args[0]
    this[IsUserError] = true
    Error.captureStackTrace(this, Error)
  }
}
