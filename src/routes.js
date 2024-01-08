import { Router } from 'express'
import { shorten, redirect } from './handler.js'

const routes = Router()

routes.get('/', (req, res) => res.send('OK'))
routes.post('/shorten', shorten)
routes.get('/:shortCode', redirect)

export default routes
