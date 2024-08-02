import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addCommentToBlog } from "../reducers/blogReducer"
import { Button, List, ListItem } from "./StyledComponents"

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    dispatch(addCommentToBlog(blogId, comment))
    setComment("")
  }

  return (
    <form onSubmit={handleCommentSubmit}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button type="submit" variant="small">
        add comment
      </Button>
    </form>
  )
}

export default CommentForm
