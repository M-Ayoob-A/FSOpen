const { test, expect, beforeEach, describe } = require('@playwright/test')
const assert = require('assert')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'firstUser',
        name: 'User',
        password: 'pword'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByRole('heading', { name: 'Login' })
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('firstUser')
      await page.getByLabel('password').fill('pword')
      await page.getByRole('button').click()
      await expect(page.getByText('blogs')).toBeVisible()
      await expect(page.getByText('User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('firstUser')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button').click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('firstUser')
      await page.getByLabel('password').fill('pword')
      await page.getByRole('button').click()

      await page.getByText('create new blog').click()
      await page.getByLabel('title').fill('first Blog')
      await page.getByLabel('author').fill('Blogger Blig')
      await page.getByLabel('url').fill('www.blog.com')
      await page.getByRole('button', { name: 'create' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('first Blog Blogger Blig')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by the user who created it', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'delete' }).click()
      await expect(page.getByText('first Blog Blogger Blig')).not.toBeVisible()
    })

    test('a user can logout, and a blog cannot be deleted by other than the user who made it', async ({ page, request }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'secondUser',
          name: 'User2',
          password: 'pword2'
        }
      })

      await page.getByLabel('username').fill('secondUser')
      await page.getByLabel('password').fill('pword2')
      await page.getByRole('button').click()

      await expect(page.getByText('first Blog Blogger Blig')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })

    test.only('blogs appear in descending order of likes', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      const likeBlog1 = page.getByRole('button', { name: 'like' })
      await likeBlog1.click()
      await likeBlog1.click()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.getByLabel('title').fill('second Blog')
      await page.getByLabel('author').fill('Blogger Blig')
      await page.getByLabel('url').fill('www.blog2.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByText('second Blog').getByRole('button', { name: 'view' }).click()
      const likeBlog2 = page.getByRole('button', { name: 'like' })
      await likeBlog2.click()
      await likeBlog2.click()
      await likeBlog2.click()
      await likeBlog2.click()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.getByLabel('title').fill('third Blog')
      await page.getByLabel('author').fill('Blogger Blig')
      await page.getByLabel('url').fill('www.blog3.com')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('third Blog Blogger Blig')).toBeVisible()

      const allBlogs = await page.getByText('Blog Blogger Blig').allInnerTexts()
      expect(allBlogs).toEqual(['second Blog Blogger Bligview','first Blog Blogger Bligview', 'third Blog Blogger Bligview'])
    })
  })
})