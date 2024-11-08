const express = require('express')
const userRoutes = require('../routes/userRoutes')
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/user', userRoutes)

const PORT = process.env.PORT || 3009
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
