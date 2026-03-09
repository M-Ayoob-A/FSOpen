const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}


const favoriteBlog = (blogs) => {
  return blogs.length ? blogs.reduce((fav, blog) => fav.likes >= blog.likes ? fav : blog)
                      : null
}

const mostBlogs = (blogs) => {
    let authors = {}
    for (const blog of blogs) {
        if (authors[blog['author']]) {
            authors[blog['author']]++
        } else {
            authors[blog['author']] = 1
        }
    }
    const maxAuth = Object.keys(authors).reduce((max, auth) => authors[max] >= authors[auth] ? max : auth)
    return {
      author: maxAuth,
      blogs: authors[maxAuth]
    }
}

const mostLikes = (blogs) => {
    let authors = {}
    for (const blog of blogs) {
        if (authors[blog['author']]) {
            authors[blog['author']] += blog['likes']
        } else {
            authors[blog['author']] = blog['likes']
        }
    }
    const maxAuth = Object.keys(authors).reduce((max, auth) => authors[max] >= authors[auth] ? max : auth)
    return {
      author: maxAuth,
      likes: authors[maxAuth]
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}