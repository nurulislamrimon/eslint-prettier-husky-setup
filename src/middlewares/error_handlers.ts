import { ErrorRequestHandler, RequestHandler } from 'express'
import { errorLogger } from '../logger/logger'

export const not_exist_route_error_handler: RequestHandler = (
  req,
  res,
  next
) => {
  try {
    res.send({
      status: 'failed',
      message: 'Route not found!',
    })
    errorLogger.error('Route not found!')
  } catch (error) {
    next(error)
  }
}
export const error_handler: ErrorRequestHandler = (err, req, res, next) => {
  res.send({
    status: 'failed',
    message: err.message,
  })
  errorLogger.error(err.message)
  next()
}
