const makeAuthAdmin = ({ auth }) => {
  const verifyIdpToken = async ({ idpToken }) => {
    console.log('\n\n', idpToken, '\n\n');
    const decodedIdpToken = await auth.verifyIdToken(idpToken);
    return { ...decodedIdpToken };
  };

  return Object.freeze({
    verifyIdpToken,
  });
};

exports.makeAuthAdmin = makeAuthAdmin;
