import { createContext, useReducer } from "react";

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      clearTimeout(state.timer)
      return { ...state, notif: `anecdote '${action.payload}' voted` }
    case 'CREATE':
      clearTimeout(state.timer)
      return { ...state, notif: `anecdote '${action.payload}' created` }
    case 'ERR':
      clearTimeout(state.timer)
      return { ...state, notif: action.payload }
    case 'REMOVE':
      return { ...state, notif: '' }
    case 'CHANGETIMER':
      return { ...state, timer: action.payload }
    default:
      return state
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notifObject, notifDispatch] = useReducer(notifReducer, { notif: '', timer: 0 })

  const showNotif = (action) => {
    notifDispatch(action)

    const newTimerID = setTimeout(() => {
      notifDispatch({ type: 'REMOVE' })
    }, 5000)
    
    notifDispatch({
      type: 'CHANGETIMER',
      payload: newTimerID
    })
  }

  return (
    <NotifContext.Provider value={{ notifObject, showNotif }}>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext