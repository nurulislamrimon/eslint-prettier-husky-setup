import colors from 'colors'

import app from './app/app'
import config from './config/config'
import {
  error_handler,
  not_exist_route_error_handler,
  // not_exist_route_error_handler,
} from './middlewares/error_handlers/error_handlers'
import { errorLogger } from './logger/logger'
import { Server } from 'http'

async function server_main_function() {
  let server: Server
  try {
    // error handler
    app.use(not_exist_route_error_handler)
    app.use(error_handler)

    server = app.listen(config.port, () => {
      console.log(
        colors.magenta(`Example app listening on port ${config.port}`)
      )
    })
  } catch (error) {
    errorLogger.error('failed to connect database', error)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
      })
      process.exit(1)
    } else {
      process.exit(1)
    }
  })
}

server_main_function()
