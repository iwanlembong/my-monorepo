const express = require('express')
const {
  fetchAllUsers,
  fetchUserData,
  createNewUser,
  updateUserData,
  loginUser,
} = require('../controller/api')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/fetch-all-users', fetchAllUsers)
router.get('/fetch-user-data', authMiddleware, fetchUserData)
router.post('/create-user', createNewUser) // New route to create a us
router.post('/update-user-data', authMiddleware, updateUserData)
router.post('/login', loginUser) // New login route

module.exports = router
