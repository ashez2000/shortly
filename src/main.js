import 'dotenv/config'

import http from 'node:http'
import mongoose from 'mongoose'
import app from './app.js'

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI).then(() => console.log('Connected to mongodb'))

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Listening on port', PORT)
})
