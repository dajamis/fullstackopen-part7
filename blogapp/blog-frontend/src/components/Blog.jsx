import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { viewBlog } from "../reducers/blogReducer"
import CommentForm from "./CommentForm"
import { Button, List, ListItem } from "./StyledComponents"

const Blog = ({ handleLike, handleDelete }) => {
  const params = useParams()
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.blog.selectedBlog)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(viewBlog(id))
  }, [dispatch, id])

  if (!blog) {
    return <div>Loading...</div>
  }

  return (
    <div className="blog">
      <h3>
        {blog.title} {blog.author}
      </h3>
      <div className="blogDetails">
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes{" "}
          <Button onClick={() => handleLike(blog)} variant="small">
            like
          </Button>
        </p>
        <p>added by {blog.user.username}</p>
        {user && blog.user && blog.user.username === user.username && (
          <Button onClick={() => handleDelete(blog)} variant="small">
            remove
          </Button>
        )}
      </div>
      <div>
        <h4>Comments</h4>
        <CommentForm blogId={blog.id} />
        <List>
          {blog.comments.map((comment, index) => (
            <ListItem key={index}>{comment}</ListItem>
          ))}
        </List>
      </div>
    </div>
  )
}

export default Blog
