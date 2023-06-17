import colors from 'colors'

import app from './app/app'
import config from './config/config'
import {
  error_handler,
  // not_exist_route_error_handler,
} from './middlewares/error_handlers'

// error handler
// app.use(not_exist_route_error_handler)
app.use(error_handler)

app.listen(config.port, () => {
  console.log(colors.magenta(`Example app listening on port ${config.port}`))
})
