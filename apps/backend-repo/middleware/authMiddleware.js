const { admin } = require('../config/firebaseConfig')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // Expecting Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {

    const decoded = jwt.decode(token, { complete: true })
    console.log('Decoded JWT Token:',   ) // Check token details, especially the "exp" field

    // Now, verify the token using Firebase Admin SDK
    // const decodedToken = await admin.auth().verifyIdToken(token)
    // console.log('Decoded Token:', decodedToken) // Log the decoded token to see its contents

    req.user = decoded // decodedToken
    next()
  } catch (error) {
    res
      .status(403)
      .json({ message: 'Failed to authenticate token', error: error.message })
  }
}

module.exports = authMiddleware
