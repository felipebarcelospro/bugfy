class ExpressRouterAdapter {
  static adapt (controller) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
        params: req.params,
        cookies: req.cookies,
        query: req.query
      }

      const { statusCode, success, message, data } = await controller.execute(httpRequest)

      res.status(statusCode).json({
        statusCode,
        success,
        message,
        data
      })
    }
  }
}

module.exports = { ExpressRouterAdapter }
