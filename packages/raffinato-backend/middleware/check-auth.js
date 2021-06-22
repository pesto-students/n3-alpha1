const makeCheckAuth = ({ authAdmin }) => {
  return async (req, res, next) => {
    try {
      const { originalUrl } = req

      // Do not check auth headers for these routes
      if (
        originalUrl.includes('products') ||
        originalUrl.includes('product') ||
        originalUrl.includes('settings')
      ) {
        return next()
      }
      const idpToken = req.headers?.authorization
      if (!idpToken) {
        throw new Error('Invalid Token')
      }

      // decodedIdpToken contains a uid property that can be used to authorize users
      const decodedIdpToken = await authAdmin.verifyIdpToken({ idpToken })
      req.auth = { ...decodedIdpToken }
    
      return next()
    } catch (e) {
      console.log(e)
      const error = new Error('Invalid access token', 500)
      return next(error)
    }
  }
}

exports.makeCheckAuth = makeCheckAuth
