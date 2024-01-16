import { Router } from 'express'
import { shorten, redirect } from './handler.js'

const routes = Router()

routes.get('/', (req, res) => res.send('OK'))
routes.post('/shorten', shorten)
routes.get('/:shortcode', redirect)

export default routes
