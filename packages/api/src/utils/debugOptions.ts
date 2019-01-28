const { NODE_ENV } = process.env

export default (true
  ? {
    debug: true,
    introspection: true,
    playground: true,
    tracing: true,
  }
  : {})
