const { AppError } = require('./error.helper')

class MissingParamError extends AppError {
  constructor (errors) {
    super(errors)

    this.statusCode = 400
    this.name = 'MissingParamError'
    this.message = 'MissingParamError'
    this.data = errors
  }
}

module.exports = { MissingParamError }
