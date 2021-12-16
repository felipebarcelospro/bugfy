const axios = require('axios')
const Youch = require('youch')

class BugFy {
  constructor (config) {
    this.config = config
    this.api = this.getApi()
  }

  getApi () {
    const api = axios.create({
      baseURL: 'https://bugfy-api.cloud.trendfy.com.br/api/v1',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    return api
  }

  async sendError (err) {
    const { host, application, environment, discordChannelId, whatsAppGroupId } = this.config
    const { message, stack } = err

    const body = {
      error: {
        message,
        stack,
        environment,
        application,
        host
      },
      discordChannelId,
      whatsAppGroupId
    }

    await this.api.post('/errors', body)
  }

  async expressMiddleware (err, req, res, next) {
    if (!err) next()

    await this.sendError(err)

    if (process.env.NODE_ENV === 'production') {
      const errors = await new Youch(err, req).toJSON()

      console.log({
        status: 'error',
        message: errors.error.message,
        stack: errors.error.frames
      })

      return res.status(500).json({
        statusCode: 500,
        success: false,
        message: 'Internal server error'
      })
    }

    if (process.env.NODE_ENV === 'dev') {
      const errors = await new Youch(err, req).toJSON()

      return res.status(500).json({
        statusCode: 500,
        success: false,
        message: 'Internal server error',
        stack: errors.error.frames
      })
    }
  }
}

module.exports = { BugFy }
