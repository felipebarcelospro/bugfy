
const express = require('express')
const cors = require('cors')

const { errorRouter } = require('./modules/errors/error.router')

class App {
  constructor () {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
  }

  routes () {
    this.express.use('/api/v1/errors', errorRouter)
  }
}

module.exports = { app: new App().express }
