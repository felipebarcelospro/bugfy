const { Router } = require('express')
const { ExpressRouterAdapter } = require('../../adapters/expressRouter.adapter')
const { CreateErrorComposer } = require('./composers/createError.composer')

const errorRouter = new Router()

const { createErrorController } = CreateErrorComposer.compose()
errorRouter.post('/', ExpressRouterAdapter.adapt(createErrorController))

module.exports = { errorRouter }
