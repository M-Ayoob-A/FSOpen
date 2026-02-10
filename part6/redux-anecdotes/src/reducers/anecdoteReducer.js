import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes.js'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdoteHelper(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  },
})

const { setAnecdotes, newAnecdote, voteAnecdoteHelper } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdoteObj = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newAnecdoteObj))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.vote(id)
    dispatch(voteAnecdoteHelper(id))
  }
}

export default anecdoteSlice.reducer