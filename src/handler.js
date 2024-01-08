import { z } from 'zod'
import { nanoid } from 'nanoid'
import db from './db.js'

export const shorten = async (req, res) => {
  const result = z.string().url().safeParse(req.body.link)
  if (result.success === false) {
    res.status(400).json({ message: 'Provide a valid link' })
    return
  }

  const shortCode = nanoid(7)

  await db.shortLink.create({
    data: {
      link: result.data,
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
