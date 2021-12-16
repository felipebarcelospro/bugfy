const { HttpResponse } = require('../../../helpers/httpResponse.helper')

class CreateErrorUseCase {
  constructor (queueService) {
    this.queueService = queueService
  }

  async execute ({ data }) {
    const { error, discordChannelId, whatsAppGroupId } = data

    await this.queueService.send('SendDiscordMessage', { error, discordChannelId })
    await this.queueService.send('SendWhatsAppMessage', { error, whatsAppGroupId })

    return HttpResponse.ok('Error sended successfully', error)
  }
}

module.exports = { CreateErrorUseCase }
