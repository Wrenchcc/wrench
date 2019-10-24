const { NODE_ENV } = process.env

export default NODE_ENV !== 'production'
  ? {
      cacheControl: true,
      debug: true,
      introspection: true,
      playground: true,
      tracing: true,
    }
  : {}
