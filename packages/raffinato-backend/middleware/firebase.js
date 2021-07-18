const makeAuthAdmin = ({ auth }) => {
  const verifyIdpToken = async ({ idpToken }) => {
    const decodedIdpToken = await auth.verifyIdToken(idpToken);
    return { ...decodedIdpToken };
  };

  return Object.freeze({
    verifyIdpToken,
  });
};

exports.makeAuthAdmin = makeAuthAdmin;
