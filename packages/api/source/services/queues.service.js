const Queue = require('bull')
const redisConfig = require('../configs/redis.config')

class QueuesService {
  constructor () {
    this.configs = redisConfig
    this.queues = [
      'SendDiscordMessage'
    ].map((queue) => new Queue(queue, this.configs))
  }

  send (name, data) {
    const queue = this.queues.find((queue) => queue.name === name)

    return queue.add(data, { timeout: 10000, ...queue.options })
  }
}

module.exports = { QueuesService }
