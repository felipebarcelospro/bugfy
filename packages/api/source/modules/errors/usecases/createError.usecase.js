const { HttpResponse } = require('../../../helpers/httpResponse.helper')

class CreateErrorUseCase {
  constructor (queueService) {
    this.queueService = queueService
  }

  async execute ({ data }) {
    const { error, discordChannelId } = data

    await this.queueService.send('SendDiscordMessage', { error, discordChannelId })
    return HttpResponse.ok('Error sended successfully', error)
  }
}

module.exports = { CreateErrorUseCase }
