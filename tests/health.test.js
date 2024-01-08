import { test, expect } from 'vitest'
import supertest from 'supertest'
import app from '../src/app.js'

test('GET /', async () => {
  const res = await supertest(app).get('/')
  expect(res.status).toBe(200)
  expect(res.text).toBe('OK')
})
