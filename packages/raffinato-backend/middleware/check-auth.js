const makeCheckAuth = ({ authAdmin }) => async (req, res, next) => {
  try {
    const { originalUrl } = req;

    // Do not check auth headers for these routes
    if (
      originalUrl.includes('product')
        || originalUrl.includes('settings')
        || originalUrl.includes('api-docs')
        || originalUrl.includes('hook')
    ) {
      return next();
    }

    const bearerHeader = req.headers?.authorization;
    if (!bearerHeader) {
      throw new Error('Invalid Token');
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    // decodedIdpToken contains a uid property that can be used to authorize users
    const decodedIdpToken = await authAdmin.verifyIdpToken({ idpToken: bearerToken });
    res.locals.auth = { ...decodedIdpToken };

    return next();
  } catch (e) {
    const error = new Error('Invalid access token', 403);
    return next(error);
  }
};

exports.makeCheckAuth = makeCheckAuth;
