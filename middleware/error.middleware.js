const logger = require("../config/logger")

module.exports = (err, req, res, next) => {
  logger.error(err.message, {
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    params: req.params,
    query: req.query,
    stack: err.stack,
    user: req.user ? req.user.id : null
  })

  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  })
}