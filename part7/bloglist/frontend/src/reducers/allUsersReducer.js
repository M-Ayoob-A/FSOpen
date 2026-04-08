import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initialise(_, action) {
      return action.payload;
    },
  },
});

const { initialise } = usersReducer.actions;

export const initialiseUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(initialise(users));
  };
};

export default usersReducer.reducer;
