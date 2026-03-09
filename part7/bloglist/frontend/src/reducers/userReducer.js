import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUserRedux(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    }
  }
})

export const { setUserRedux, removeUser } = userSlice.actions;


export default userSlice.reducer