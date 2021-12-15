const { AppError } = require('./error.helper')

class NotFoundEntityError extends AppError {
  constructor (entityName) {
    super(`${entityName} not found`)

    this.statusCode = 404
    this.name = 'NotFoundEntityError'
    this.message = `${entityName} not found`
  }
}

module.exports = { NotFoundEntityError }
