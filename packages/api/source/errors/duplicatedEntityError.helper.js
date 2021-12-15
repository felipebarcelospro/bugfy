const { AppError } = require('./error.helper')

class DuplicatedEntityError extends AppError {
  constructor (entityName) {
    super(`${entityName} already exists`)

    this.statusCode = 400
    this.name = 'DuplicatedEntityError'
    this.message = `${entityName} already exists`
  }
}

module.exports = { DuplicatedEntityError }
