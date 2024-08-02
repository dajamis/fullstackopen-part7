import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import userListReducer from "./reducers/userListReducer"
import blogListReducer from "./reducers/BlogListReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    blogList: blogListReducer,
    user: userReducer,
    userList: userListReducer,
  },
})

export default store
