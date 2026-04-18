import { useState } from "react";
import loginService from "../services/login";
import { saveUser } from "../services/persistentUser";
import useField from "../services/fieldHook";

import { useDispatch } from "react-redux";
import { triggerNotification } from "../reducers/notifReducer";
import { setUserRedux } from "../reducers/userReducer";

const LoginForm = ({ setToken }) => {
  
  const userField = useField("text")
  const passwordField = useField("password")

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService.login({ username: userField.value, password: passwordField.value });
      saveUser(JSON.stringify(user));
      setToken(user.token);
      dispatch(setUserRedux(user));
      userField.clear();
      passwordField.clear();
    } catch {
      dispatch(triggerNotification("wrong username or password", true));
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              {...userField.fieldAttrs}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              {...passwordField.fieldAttrs}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
