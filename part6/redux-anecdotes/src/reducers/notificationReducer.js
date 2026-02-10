import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: '',
  timer: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return {
        ...state,
        content: action.payload
      }
    },
    removeNotification(state) {
      return {
        ...state,
        content: ''
      }
    },
    setTimer(state, action) {
      clearTimeout(state.timer)
      return {
        ...state,
        timer: action.payload
      }
    }
  }
})

const { showNotification, removeNotification, setTimer } = notificationSlice.actions

export const setNotification = (content, timeLength) => {
  return (dispatch) => {
    dispatch(showNotification(content))
    const timerID = setTimeout(() => {
      dispatch(removeNotification())
    }, timeLength * 1000)
    dispatch(setTimer(timerID))
    console.log(timerID)
  }
}

export default notificationSlice.reducer