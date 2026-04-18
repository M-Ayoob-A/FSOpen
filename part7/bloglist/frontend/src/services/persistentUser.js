export const getUser = () => {
  return window.localStorage.getItem("blogsAppUser");
}

export const saveUser = (user) => {
  window.localStorage.setItem("blogsAppUser", JSON.stringify(user));
}

export const removeUser = () => {
  window.localStorage.removeItem("blogsAppUser");
}
