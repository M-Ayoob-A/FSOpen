import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserRedux(state, action) {
      return action.payload;
    },
    removeUserRedux(state, action) {
      return null;
    },
  },
});

export const { setUserRedux, removeUserRedux } = userSlice.actions;

export default userSlice.reducer;
