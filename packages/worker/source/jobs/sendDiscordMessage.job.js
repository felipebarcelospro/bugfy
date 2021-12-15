const Discord = require('discord.js')

const { discordConfig } = require('../configs/discord.config')

function cap (str, length) {
  if (str == null || str?.length <= length) {
    return str
  }

  return str.substr(0, length - 1) + '\u2026'
}

module.exports = {
  key: 'SendDiscordMessage',
  async handle ({ error, discordChannelId }) {
    const { message, stack, environment, host, application } = error

    const embed = new Discord.MessageEmbed()

    embed.setTitle(message)
    embed.setColor(0xff0000)
    embed.setAuthor('BugFy → Discord', '', 'https://bugfy.dev')

    embed.addField('Stack', `\`\`\`${cap(stack, 1000)}\n\`\`\``)
    embed.addField('Environment', `\`\`\`${environment}\`\`\``)
    embed.addField('Host', `\`\`\`${host}\`\`\``)
    embed.addField('Application', `\`\`\`${application}\`\`\``)

    const discord = new Discord.Client()

    const { token } = discordConfig

    discord.login(token)
    discord.on('ready', () => {
      discord.channels.cache.get(discordChannelId).send({
        embed: embed
      })
    })
  }
}
