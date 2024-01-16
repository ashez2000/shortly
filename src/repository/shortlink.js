import db from '../db.js'

export const createShortLink = async (link, shortcode) => {
  return await db.shortLink.create({
    data: {
      link,
      shortcode,
    },
  })
}

export const findShortLink = async (shortcode) => {
  return await db.shortLink.findUnique({
    where: {
      shortcode,
    },
  })
}
