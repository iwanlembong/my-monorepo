const { db } = require('../config/firebaseConfig')

const userCollection = db.collection('USERS')

const getAllUsers = async () => {
  const snapshot = await userCollection.get()
  const users = []
  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() })
  })
  return users
}

const getUserById = async (userId) => {
  console.log(userId, 'Isi dari user id>>>>>>>>>>')
  const userDoc = await userCollection.doc(userId).get()
  return userDoc.exists ? userDoc.data() : null
}

const createUser = async (userData) => {
  const newUserRef = userCollection.doc() // Automatically generate a new document ID
  await newUserRef.set(userData)
  return { id: newUserRef.id, ...userData }
}

const updateUserById = async (userId, data) => {
  await userCollection.doc(userId).set(data, { merge: true })
}

module.exports = { getAllUsers, getUserById, createUser, updateUserById }
