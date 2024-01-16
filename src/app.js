import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import 'express-async-errors'

import routes from './routes.js'

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes,
    limit: 30,
    standardHeaders: 'draft-7',
    handler: (req, res) => {
      res.status(429).json({ message: 'Too many request' })
    },
  })
)

app.use(routes)

app.use((req, res) => {
  res
    .status(404)
    .json({ message: `${req.method} ${req.originalUrl} not found` })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

export default app
