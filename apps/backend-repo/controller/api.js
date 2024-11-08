const axios = require('axios');
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
} = require('../repository/userCollection')

const { admin, db } = require('../config/firebaseConfig')

const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users data', error })
  }
}


const fetchUserData = async (req, res) => {
  const userId =  req.user.payload.uid
  const {uid} = req.body;
  try {
    const userData = await getUserById(uid)
    if (userData) {
      res.json(userData)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' })
  }
}

const createNewUser = async (req, res) => {
  const userData = req.body

  try {
    // Ensure required fields (e.g., name, email) are present in the request body
    if (!userData.name || !userData.email) {
      return res.status(400).json({ message: 'Name and email are required' })
    }

    const newUser = await createUser(userData)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error })
  }
}

const updateUserData = async (req, res) => {
  const userId = req.body.id
  const data = req.body

  try {
    await updateUserById(userId, data)
    res.json({ message: 'User data updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error updating user data' })
  }
}


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use Firebase Authentication REST API to verify email and password
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    // Get the user's UID from the REST API response
    const { localId: uid } = response.data;

    // Generate a custom token using the UID
    const customToken = await admin.auth().createCustomToken(uid);

    res.json({ customToken });
  } catch (error) {
    res.status(401).json({
      message: 'Invalid email or password',
      error: error.response?.data?.error?.message || error.message,
    });
  }
};

module.exports = {
  fetchAllUsers,
  fetchUserData,
  createNewUser,
  updateUserData,
  loginUser,
}
