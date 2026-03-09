import { createSlice } from '@reduxjs/toolkit'

const initialNotificationState = {
  content: null,
  timer: 0,
  err: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    setNotification(state, action) {
      clearTimeout(state.timer)
      return {
        ...state,
        content: action.payload.content,
        err: action.payload.err
      }
    },
    removeNotification(state) {
      return {
        ...state,
        content: null
      }
    },
    setTimer(state, action) {
      return {
        ...state,
        timer: action.payload
      }
    }
  }
})

const { setNotification, removeNotification, setTimer } = notificationSlice.actions

export const triggerNotification = (content, err) => {
  return (dispatch) => {
    dispatch(setNotification({content: content, err: err}))
    const timer = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    dispatch(setTimer(timer))
  }
}

export default notificationSlice.reducer