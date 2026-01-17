const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  console.log('In reset')
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('DONE reset')

  response.status(204).end()
})

module.exports = router