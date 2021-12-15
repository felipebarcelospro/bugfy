const { QueuesService } = require('../../../services/queues.service')
const { CreateErrorController } = require('../controllers/createError.controller')
const { CreateErrorUseCase } = require('../usecases/createError.usecase')

class CreateErrorComposer {
  static compose () {
    const queueService = new QueuesService()
    const createErrorUseCase = new CreateErrorUseCase(queueService)
    const createErrorController = new CreateErrorController(createErrorUseCase)

    return {
      createErrorController
    }
  }
}

module.exports = { CreateErrorComposer }
