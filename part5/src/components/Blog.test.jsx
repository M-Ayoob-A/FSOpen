import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

test('renders blog content correctly', () => {
  const blog = {
    id: 'bv4b6i47nq4y2r',
    title: 'Component testing',
    author: 'Kafka Parody',
    url: 'www.blog.com',
    likes: 24,
    user : {
      name: 'name1',
      id: '28765nryd8o4y12jos41o2j',
      username: 'username1'
    }
  }

  render(<Blog blog={blog} />)

  screen.getByText('Component testing', { exact: false })
  screen.getByText('Kafka Parody', { exact: false })
  const urlText = screen.queryByText('www.blog.com')
  expect(urlText).toBeNull()
  const likesTotal = screen.queryByText('24')
  expect(likesTotal).toBeNull()
})

test('clicking the view button reveals url and likes', async () => {
  const blog = {
    id: 'bv4b6i47nq4y2r',
    title: 'Component testing',
    author: 'Kafka Parody',
    url: 'www.blog.com',
    likes: 24,
    user : {
      name: 'name1',
      id: '28765nryd8o4y12jos41o2j',
      username: 'username1'
    }
  }

  render(
    <Blog blog={blog} byUser={true} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  screen.getByText('www.blog.com', { exact: false })
  screen.getByText('24', { exact: false })
})

test('clicking the like button calls the relevant event handler', async () => {
  const blog = {
    id: 'bv4b6i47nq4y2r',
    title: 'Component testing',
    author: 'Kafka Parody',
    url: 'www.blog.com',
    likes: 24,
    user : {
      name: 'name1',
      id: '28765nryd8o4y12jos41o2j',
      username: 'username1'
    }
  }

  const likesMockHandler = vi.fn()

  render(
    <Blog blog={blog} byUser={true} updateBlogOnLike={likesMockHandler} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likesButton = screen.getByText('like')
  await user.click(likesButton)
  expect(likesMockHandler.mock.calls).toHaveLength(1)
  await user.click(likesButton)
  expect(likesMockHandler.mock.calls).toHaveLength(2)
})

test('submitting the create blog form calls the relevant event handler', async () => {

  const createBlogHandlerMock = vi.fn()

  render(
    <CreateBlogForm handleUpdateBlogs={createBlogHandlerMock} />
  )

  const user = userEvent.setup()
  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const createButton = screen.getByRole('button')

  await user.type(titleInput, 'Component testing')
  await user.type(authorInput, 'Kafka Parody')
  await user.type(urlInput, 'www.blog.com')

  await user.click(createButton)

  expect(createBlogHandlerMock.mock.calls[0]).toHaveLength(1)

  expect(createBlogHandlerMock.mock.calls[0][0].title).toBe('Component testing')
  expect(createBlogHandlerMock.mock.calls[0][0].author).toBe('Kafka Parody')
  expect(createBlogHandlerMock.mock.calls[0][0].url).toBe('www.blog.com')

})