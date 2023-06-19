import express, { Application } from 'express'
import cors from 'cors'
import { logger } from '../logger/logger'

const app: Application = express()
// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// home route
app.get('/', (req, res) => {
  res.send('Hello World!')
  logger.info('home route responsed!')
})

export default app
