const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { before, initial } = require('lodash')

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
  await Blog.insertMany(initialBlogs)
})

test('correct number of blogs returned, in json format', async () => {
  const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('identifier key is "id"', async () => {
  const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
  
  assert(response.body[0]['id'])
})

test('POST request creates a new blog post', async () => {
  const newBlog = {
    title: "Beyblade",
    author: "Gi Ji",
    url: "http://hypertop.com.au",
    likes: 68
  }
  
  await api.post('/api/blogs')
          .send(newBlog)    
          .expect(201)
          .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs').expect(200)
    
  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  const urls = response.body.map(blog => blog.url)

  assert(urls.includes(newBlog.url))
})

test('New blog post defaults to 0 likes', async () => {
  const newBlog = {
    title: "Beyblade",
    author: "Gi Ji",
    url: "http://hypertop.com.au"
  }
  
  await api.post('/api/blogs').send(newBlog).expect(201)

  const response = await api.get('/api/blogs').expect(200)
    
  assert.strictEqual(response.body.length, initialBlogs.length + 1)

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
  
  await api.post('/api/blogs').send(missingTitle).expect(400)

  await api.post('/api/blogs').send(missingUrl).expect(400)
})

test('Deletion works', async () => {
  const newBlog = {
    title: "Beyblade",
    author: "Gi Ji",
    url: "http://hypertop.com.au",
    likes: 78
  }
  
  await api.post('/api/blogs').send(newBlog).expect(201)

  const response = await api.get('/api/blogs').expect(200)
  
  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  const newlyCreatedBlog = response.body.filter(blog => blog.url === newBlog.url)[0]

  await api.delete(`/api/blogs/${newlyCreatedBlog["id"]}`).expect(204)

  const response2 = await api.get('/api/blogs').expect(200)
    
  assert.strictEqual(response2.body.length, initialBlogs.length)
  assert.strictEqual(response2.body.filter(blog => blog.url === newBlog.url).length, 0)
})


test('Update works', async () => {
  const response = await api.get('/api/blogs').expect(200)

  const randomBlogFromDB = response.body[0]

  const updatedBlog = {
    title: "Beyblade",
    author: randomBlogFromDB["author"],
    url: randomBlogFromDB["url"] + '.mozilla',
    likes: randomBlogFromDB["likes"] + 43,
    id: randomBlogFromDB["id"]
  }

  await api.put(`/api/blogs/${randomBlogFromDB["id"]}`).send(updatedBlog).expect(200)

  const response2 = await api.get('/api/blogs').expect(200)
  const checkUpdatedBlog = response2.body.filter(blog => blog.id === randomBlogFromDB.id)[0]
  assert.deepStrictEqual(checkUpdatedBlog, updatedBlog)
})

after(async () => {
  await mongoose.connection.close()
})