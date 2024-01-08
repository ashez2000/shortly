import { test, expect } from 'vitest'
import supertest from 'supertest'

import app from '../src/app.js'
import { resetDb } from '../src/db.js'

test('POST /shorten', async () => {
  await resetDb()

  const res = await supertest(app)
    .post('/shorten')
    .send({ link: 'https://www.google.com' })

  expect(res.status).toBe(201)
  expect(res.body.shortCode.length).toBe(7)
})

test('POST /shorten (no body)', async () => {
  await resetDb()

  const res = await supertest(app).post('/shorten')

  expect(res.status).toBe(400)
})
