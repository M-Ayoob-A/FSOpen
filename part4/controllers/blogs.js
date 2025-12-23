const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)

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