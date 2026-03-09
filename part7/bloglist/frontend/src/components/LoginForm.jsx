import { useState } from 'react'
import loginService from '../services/login'

import { useDispatch } from "react-redux";
import { triggerNotification } from "../reducers/notifReducer";
import { setUserRedux } from '../reducers/userReducer';


const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogsAppUser', JSON.stringify(user))
      setToken(user.token)
      dispatch(setUserRedux(user))
      setUsername('')
      setPassword('')
    } catch {
      dispatch(triggerNotification('wrong username or password', true))
    }
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm