const { HttpResponse } = require('../../../helpers/httpResponse.helper')

class CreateErrorUseCase {
  constructor (queueService) {
    this.queueService = queueService
  }

  execute ({ data }) {
    const { error, discordChannelId } = data

    this.queueService.send('SendDiscordMessage', { error, discordChannelId })
    return HttpResponse.ok('Error sended successfully', error)
  }
}

module.exports = { CreateErrorUseCase }
