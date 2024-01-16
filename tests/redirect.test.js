import { test, expect } from 'vitest'
import supertest from 'supertest'

import app from '../src/app.js'
import { resetDb } from '../src/db.js'
import { createShortLink } from '../src/repository/shortlink.js'

test('GET /{shortcode}', async () => {
  await resetDb()

  const s = await createShortLink('https://www.google.com', '1234567')
  const res = await supertest(app).get('/' + s.shortcode)

  expect(res.status).toBe(302)
})
