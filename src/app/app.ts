import express, { Application } from 'express'
import cors from 'cors'

const app: Application = express()
// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
// home route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
