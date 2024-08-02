import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { viewUser } from "../reducers/userReducer"

const UserDetails = () => {
  const { id } = useParams()
  console.log("Parameter id: ", id)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(viewUser(id))
  }, [dispatch, id])

  if (!user) {
    return <div>Loading...</div>
  }

  if (!user.blogs) {
    return <div>No blogs posted yet.</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails
