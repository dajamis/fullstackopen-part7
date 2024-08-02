import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogListSlice = createSlice({
  name: "blogList",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { setBlogs } = blogListSlice.actions

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogListSlice.reducer
