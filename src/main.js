import 'dotenv/config'

import http from 'node:http'
import app from './app.js'

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Listening on port', PORT)
})
