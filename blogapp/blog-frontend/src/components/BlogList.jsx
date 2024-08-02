import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { initializeBlogs } from "../reducers/blogReducer"
import { List, ListItem } from "./StyledComponents"

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog.allBlogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  if (!blogs) {
    return <div>Loading...</div>
  }

  if (blogs.length === 0) {
    return <div>No blogs posted yet.</div>
  }

  return (
    <div>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogList
