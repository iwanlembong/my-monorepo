Notes : on the /apps/backend-repo, please add "config" folder on the root repo, and inside "config" folder add 2 files as below

// begin firebaseConfig.js //

const admin = require('firebase-admin') const firebase = require('firebase/app') require('firebase/auth') const dotenv = require('dotenv') dotenv.config()

const serviceAccount = require('./serviceAccountKey.json') // Update path accordingly

admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: process.env.FIREBASE_DATABASE_URL, })

// Initialize Firebase client for authentication const firebaseClientConfig = { apiKey: process.env.FIREBASE_API_KEY, authDomain: process.env.FIREBASE_AUTH_DOMAIN, } firebase.initializeApp(firebaseClientConfig)

const db = admin.firestore()

module.exports = { db, admin, firebase }

// end firebaseConfig.js //

<!-- ========================================================================== -->

// begin serviceAccountKey.json // 
// download from fitebase database 
// end serviceAccountKey.json //