const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

  const user = request.user
  const reqbody = request.body
  
  const blog = new Blog({
    title: reqbody.title,
    author: reqbody.author,
    url: reqbody.url,
    likes: reqbody.likes,
    user: user._id
  })

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  blogWithUserDetails = await newBlog.populate('user')
  response.status(201).json(blogWithUserDetails)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  //console.log(user)
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(400).json({ error: 'Invalid blog id' })
  } 
   // check if the client issuing the delete operation is the same as the one
   // who initialy added the blog post
  else if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)
    await user.save()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Unauthorised delete operation' })
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  const blogUpdates = request.body
  //const user = request.user
  //console.log(user)
  // check if the client issuing the delete operation is the same as the one
  // who initialy added the blog post
  /*if (blogUpdates.user.toString() !== user._id.toString()) {
    response.status(401).json({ error: 'Unauthorised update operation' })
    return
  }*/

  let toChange = await Blog.findById(request.params.id)

  if (!toChange) {
    response.status(400).json({ error: 'Invalid blog id' })
  } else {
    //console.log(toChange)

    //toChange.title = blogUpdates.title
    //toChange.author = blogUpdates.author
    //toChange.url = blogUpdates.url
    toChange.likes = blogUpdates.likes

    const updatedBlog = await toChange.save()
    response.json(updatedBlog)
  }

})

module.exports = blogsRouter