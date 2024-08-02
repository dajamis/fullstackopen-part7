import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    allBlogs: [],
    selectedBlog: null,
  },
  reducers: {
    setBlogs(state, action) {
      state.allBlogs = action.payload.sort((a, b) => b.likes - a.likes)
    },
    setBlog(state, action) {
      state.selectedBlog = action.payload
    },
    appendBlog(state, action) {
      state.allBlogs.push(action.payload)
      state.allBlogs.sort((a, b) => b.likes - a.likes)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      state.allBlogs = state.allBlogs
        .map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .sort((a, b) => b.likes - a.likes)
      if (state.selectedBlog && state.selectedBlog.id === updatedBlog.id) {
        state.selectedBlog = updatedBlog
      }
    },
    removeBlog(state, action) {
      const id = action.payload
      state.allBlogs = state.allBlogs
        .filter((blog) => blog.id !== id)
        .sort((a, b) => b.likes - a.likes)
      if (state.selectedBlog && state.selectedBlog.id === id) {
        state.selectedBlog = null
      }
    },
    addComment(state, action) {
      const { id, comment } = action.payload
      const blogToUpdate = state.allBlogs.find((b) => b.id === id)
      blogToUpdate.comments = blogToUpdate.comments.concat(comment)
      if (state.selectedBlog && state.selectedBlog.id === id) {
        state.selectedBlog.comments = blogToUpdate.comments
      }
    },
  },
})

export const {
  setBlogs,
  setBlog,
  appendBlog,
  updateBlog,
  removeBlog,
  addComment,
} = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(appendBlog(createdBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    dispatch(updateBlog(returnedBlog))
    // Ensure the selectedBlog is also updated
    if (blog.id === returnedBlog.id) {
      dispatch(setBlog(returnedBlog))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const viewBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getBlogById(id)
    dispatch(setBlog(blog))
  }
}

export const addCommentToBlog = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(addComment({ id, comment }))
  }
}

export default blogSlice.reducer
