import { ErrorRequestHandler, RequestParamHandler } from 'express'

export const not_exist_route_error_handler: RequestParamHandler = (
  req,
  res
) => {
  res.send({
    status: 'failed',
    message: 'Route not found!',
  })
  console.log('Route not found!')
}
export const error_handler: ErrorRequestHandler = (err, req, res) => {
  res.send({
    status: 'failed',
    message: err.message,
  })
  console.log(err.message)
}
