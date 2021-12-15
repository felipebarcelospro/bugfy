const { Validator } = require('node-input-validator')
const { HttpResponse } = require('../../../helpers/httpResponse.helper')

class CreateErrorController {
  constructor (createErrorUseCase) {
    this.createErrorUseCase = createErrorUseCase

    this.schema = {
      error: 'required|object',
      'error.message': 'required',
      'error.stack': 'required',
      'error.environment': 'required',
      'error.host': 'required',
      'error.application': 'required',
      discordChannelId: 'required'
    }
  }

  async execute (httpRequest) {
    const { body } = httpRequest

    const validator = new Validator(body, this.schema)

    const bodyIsValid = await validator.check()

    if (!bodyIsValid) {
      return HttpResponse.badRequest('Any fields is invalid', validator.errors)
    }

    return this.createErrorUseCase.execute({ data: body })
  }
}

module.exports = { CreateErrorController }
