const logger = require("../config/logger")

const requestLogger = (req, res, next) => {
  logger.info("Request received", {
    method: req.method,
    url: req.originalUrl,
    params: req.params,
    query: req.query,
    body: req.body
  })

  next()
}

module.exports = requestLogger