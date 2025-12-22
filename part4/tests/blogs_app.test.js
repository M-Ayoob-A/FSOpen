const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { before } = require('lodash')

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('correct number of blogs returned, in json format', async () => {
  const response = await api
                          .get('/api/blogs')
                          .expect(200)
                          .expect('Content-Type', /application\/json/)
    
  assert.strictEqual(response.body.length, 2)
})

test('identifier key is "id"', async () => {
  const response = await api
                          .get('/api/blogs')
                          .expect(200)
                          .expect('Content-Type', /application\/json/)
  
  assert(response.body[0]['id'])
})

test('POST request creates a new blog post', async () => {
  await api.post('/api/blogs')
          .send(initialBlogs[2])    
          .expect(201)
          .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
  assert.strictEqual(response.body.length, 3)

  const urls = response.body.map(blog => blog.url)

  assert(urls.includes(initialBlogs[2].url))
})

test('New blog post defaults to 0 likes', async () => {
  const newBlog = {
    title: "Beyblade",
    author: "Gi Ji",
    url: "http://hypertop.com.au"
  }
  
  await api.post('/api/blogs')
          .send(newBlog)    
          .expect(201)
          .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
  assert.strictEqual(response.body.length, 3)

  const newlyCreatedBlog = response.body.filter(blog => blog.url === newBlog.url)

  assert(newlyCreatedBlog[0]['likes'] === 0)
})

test('Title and url required', async () => {
  const missingTitle = {
    author: "Gi Ji",
    url: "http://hypertop.com.au",
    likes: 45
  }

  const missingUrl = {
    title: "Beyblade",
    author: "Gi Ji",
    likes: 45
  }
  
  await api.post('/api/blogs')
          .send(missingTitle)    
          .expect(400)

  await api.post('/api/blogs')
          .send(missingUrl)    
          .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})