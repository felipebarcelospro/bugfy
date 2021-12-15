require('dotenv/config')

const Queue = require('bull')
const glob = require('glob')
const path = require('path')

const { url: redisUrl } = require('./configs/redis.config')

class Worker {
  constructor() {
    this.queues = []
  }

  start(callback) {
    const jobsFiles = []

    glob.sync('**/*.job.js').forEach(function (file) {
      jobsFiles.push(require(path.resolve(file)))
    })

    this.queues = Object.values(jobsFiles).map((job) => ({
      bull: new Queue(job.key, redisUrl),
      name: job.key,
      handle: job.handle,
      options: job.options
    }))

    callback()

    return this.queues.forEach((queue) => {
      queue.bull.process(async (job) => {
        await queue.handle(job.data, { queueManager: this })
      })

      queue.bull.on('completed', (job) => {
        console.log({
          status: 'completed',
          job: job.queue.name,
          attemptsMade: job.attemptsMade,
          finishedOn: job.finishedOn
        })
      })

      queue.bull.on('failed', async (job, err) => {
        console.error({
          status: 'failed',
          job: job.queue.name,
          failedReason: err.message,
          attemptsMade: job.attemptsMade,
          finishedOn: job.finishedOn
        })

        if (!err?.data?.length) return

        const { attemptsMade } = job

        err.data.map((error) =>
          job.log(`[attempt #${attemptsMade}] - ${error}`)
        )
      })
    })
  }
}

const worker = new Worker()
worker.start(() => {
  console.log(`✅ BUGFY(Queues) running successfully (Env: ${process.env.NODE_ENV.toUpperCase()})`)
})