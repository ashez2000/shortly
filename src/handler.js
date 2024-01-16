import { z } from 'zod'
import { nanoid } from 'nanoid'
import { createShortLink, findShortLink } from './repository/shortlink.js'

export const shorten = async (req, res) => {
  const result = z.string().url().safeParse(req.body.link)
  if (result.success === false) {
    res.status(400).json({ message: 'Provide a valid link' })
    return
  }

  const shortcode = nanoid(7)
  await createShortLink(result.data, shortcode)

  res.status(201).json({ shortcode })
}

export const redirect = async (req, res) => {
  const shortcode = req.params.shortcode
  const shortLink = await findShortLink(shortcode)
  if (shortLink === null) {
    res.status(404).json({ message: 'link not found' })
    return
  }

  res.redirect(shortLink.link)
}
