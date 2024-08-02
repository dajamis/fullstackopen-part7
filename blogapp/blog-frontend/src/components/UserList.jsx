import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../reducers/userListReducer"
import { Link } from "react-router-dom"

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userList)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  console.log("Users state:", users)

  if (!users || users.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>{" "}
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
