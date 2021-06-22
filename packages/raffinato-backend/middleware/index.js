const ca = require('./check-auth.js');
const fb = require('./firebase.js');
const admin = require("firebase-admin");
const serviceAccount = require("../firebase-sa-key.json");

// initialize firebase admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth()
const authAdmin = fb.makeAuthAdmin({ auth })
const checkAuth = ca.makeCheckAuth({ authAdmin })

exports.checkAuth = checkAuth;
exports.authAdmin = authAdmin;
