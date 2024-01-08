import { nanoid } from 'nanoid'
import db from './db.js'

export const shorten = async (req, res) => {
  const link = req.body.link
  const shortCode = nanoid(7)

  await db.shortLink.create({
    data: {
      link,
      shortCode,
    },
  })

  res.status(201).json({ shortCode })
}

export const redirect = async (req, res) => {
  const shortCode = req.params.shortCode
  const shortLink = await db.shortLink.findUnique({
    where: { shortCode },
  })

  if (shortLink === null) {
    res.status(404).json({ message: 'link not found' })
    return
  }

  res.redirect(shortLink.link)
}
