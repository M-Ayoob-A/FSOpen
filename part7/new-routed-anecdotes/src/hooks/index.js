import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    inputField: { 
      type,
      value,
      onChange 
    },
    reset,
    value
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  const addAnecdote = async (anecdote) => {
    setAnecdotes(anecdotes.concat(anecdote))
    await anecdoteService.createNew(anecdote)
  }

  const deleteAnecdote = (id) => {
    setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
    anecdoteService.remove(id)
  }

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  return { anecdotes, addAnecdote, deleteAnecdote }
}