import { Schema, model } from 'mongoose'

const ShortUrlSchema = new Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  longUrl: {
    type: String,
    required: true,
    unique: true,
  },
})

export const ShortUrl = model('ShortUrl', ShortUrlSchema)
