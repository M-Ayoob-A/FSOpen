import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notifReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

export default store;
