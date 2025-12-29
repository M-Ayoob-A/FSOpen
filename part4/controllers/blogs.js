const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const reqbody = request.body
  const users = await User.find({})
  const blog = new Blog({
    title: reqbody.title,
    author: reqbody.author,
    url: reqbody.url,
    likes: reqbody.likes,
    user: users[0]["_id"]
  })

  const newBlog = await blog.save()
  users[0]['blogs'] = users[0]['blogs'].concat(newBlog._id)
  await users[0].save()
  response.status(201).json(newBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  let toChange = await Blog.findById(request.params.id)
  console.log(toChange)
  toChange.title = title
  toChange.author = author
  toChange.url = url
  toChange.likes = likes

  const updatedBlog = await toChange.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter