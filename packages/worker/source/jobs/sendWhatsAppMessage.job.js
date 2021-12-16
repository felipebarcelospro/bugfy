const axios = require('axios')

function cap (str, length) {
  if (str == null || str?.length <= length) {
    return str
  }

  return str.substr(0, length - 1) + '\u2026'
}

module.exports = {
  key: 'SendWhatsAppMessage',
  async handle ({ error, whatsAppGroupId }) {
    const { message, stack, environment, host, application } = error

    // format error for whatsapp message
    axios.post(`https://trendfy-whatsbot-api.cloud.trendfy.com.br/sendText`, {
      args: {
        to: whatsAppGroupId,
        content: 
          `-------------\n` +
          `🟥  ${message}\n` +
          `-------------\n` +
          `*Stack*: \n` +
          `${cap(stack, 1000)}\n` +
          `-------------\n` +
          `*Env*: \n` +
          `${environment}\n\n` +
          `*Host*: \n` +
          `${host}\n\n` +
          `*AppName*: \n` +
          `${application}\n\n`
      }
    })
  }
}
