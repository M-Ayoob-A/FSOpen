const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)
  
  if (!response.ok) {
    throw new Error("failed to fetch anecdotes")
  }

  return await response.json()
}

export const createNew = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers:  { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }

  const res = await fetch(baseUrl, options)

  if (!res.ok) {
    throw new Error('too short anecdote, must have length 5 or more')
  }

  return await res.json()
}

export const vote = async (votedAnecdote) => {  
  const options = {
    method: 'PUT',
    headers:  { 'Content-Type': 'application/json' },
    body: JSON.stringify(votedAnecdote)
  }

  const res = await fetch(`${baseUrl}/${votedAnecdote.id}`, options)

  if (!res.ok) {
    throw new Error("Failed to vote for anecdote")
  }

  const finalAnecdote = await res.json()

  return finalAnecdote
}
