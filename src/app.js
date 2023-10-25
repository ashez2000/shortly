import express from 'express'
import morgan from 'morgan'
import { nanoid } from 'nanoid'

import { ShortUrl } from './model.js'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => res.send('Hello, world!'))

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params
  const shortUrl = await ShortUrl.findOne({
    shortId,
  })

  if (!shortUrl) {
    return res.status(400).json({
      message: `${shortId} not found`,
    })
  }

  return res.redirect(shortUrl.longUrl)
})

app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body

  if (!longUrl) {
    return res.status(400).json({
      message: 'longUrl not provided',
    })
  }

  let shortUrl = await ShortUrl.findOne({
    longUrl,
  })

  if (shortUrl) {
    return res.status(200).json({
      shortId: shortUrl.shortId,
      longUrl: shortUrl.longUrl,
    })
  }

  const shortId = nanoid(7)

  shortUrl = await ShortUrl.create({
    shortId,
    longUrl,
  })

  return res.status(200).json({
    shortId: shortUrl.shortId,
    longUrl: shortUrl.longUrl,
  })
})

export default app
