import colors from 'colors'

import app from './app/app'
import config from './config/config'

const a = 10

app.listen(config.port, () => {
  console.log(colors.magenta(`Example app listening on port ${config.port}`))
})
