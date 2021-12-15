class HttpResponse {
  static badRequest (message, data) {
    return {
      statusCode: 400,
      success: false,
      message,
      data
    }
  }

  static serverError (message, data) {
    return {
      statusCode: 500,
      success: false,
      message,
      data
    }
  }

  static ok (message, data) {
    return {
      statusCode: 200,
      success: true,
      message,
      data
    }
  }

  static notFound (message, data) {
    return {
      statusCode: 404,
      success: false,
      message,
      data
    }
  }
}

module.exports = { HttpResponse }
