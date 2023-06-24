//typescript-eslint.io/rules/no-explicit-any
import { ErrorRequestHandler, RequestHandler } from 'express'
import { errorLogger } from '../../logger/logger'
import config from '../../config/config'
import mongoose from 'mongoose'

export class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export const error_handler: ErrorRequestHandler = (err, req, res, next) => {
  type IGenericErrorMessage = {
    path: string
    message: string
  }
  let statusCode = 500
  let message = ''
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'validationError') {
    // for validation Err type
    const validationErr: mongoose.Error.ValidationError = err
    const format_validationError: IGenericErrorMessage[] = Object.values(
      validationErr?.errors
    ).map((el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return { path: el?.path, message: el?.message }
    })
    message = err?.message
    statusCode = 400
    errorMessages = format_validationError
  } else if (err instanceof ApiError) {
    message = err.message
    statusCode = err.statusCode
    errorMessages = [
      {
        path: '',
        message: '',
      },
    ]
  } else if (err instanceof Error) {
    message = err.message
    errorMessages = [
      {
        path: '',
        message: '',
      },
    ]
  }

  res.status(statusCode).send({
    status: 'failed',
    message,
    errorMessages,
    stack: config.env !== 'development' ? undefined : err.stack,
  })
  errorLogger.error(err.message)
  next()
}

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
