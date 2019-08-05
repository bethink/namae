const { send, sendError, fetch } = require('../util/http')

module.exports = async (req, res) => {
  const { query } = req.query

  if (!query) {
    return sendError(res, new Error('no query given'))
  }

  try {
    const response = await fetch(
      `https://rubygems.org/gems/${encodeURIComponent(query)}`
    )
    const availability = response.status !== 200
    send(res, { availability })
  } catch (err) {
    sendError(res, err)
  }
}
