const { NODE_ENV } = process.env

export default (NODE_ENV !== 'production'
  ? {
      debug: true,
      introspection: true,
      playground: true,
      tracing: true,
    }
  : {})
