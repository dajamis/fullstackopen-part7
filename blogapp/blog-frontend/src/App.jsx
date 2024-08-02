import { useState, useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom"

//Components
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import CreateNewBlog from "./components/CreateNewBlog"
import Togglable from "./components/Togglable"
import UserList from "./components/UserList"
import UserDetails from "./components/UserDetails"
import BlogList from "./components/BlogList"
import {
  Button,
  Container,
  Input,
  Page,
  Navigation,
  NavLinks,
  NavUserInfo,
} from "./components/StyledComponents"

//Reducers
import { notify } from "./reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer"
import { loginUser, logoutUser, initializeUser } from "./reducers/userReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [formVisible, setFormVisible] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginUser(username, password))
      setUsername("")
      setPassword("")
      dispatch(notify("Login successful", "success", 5))
    } catch (exception) {
      dispatch(notify("wrong username or password", "error", 5))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(notify("User logged out", "success", 5))
  }

  const handleCreateNew = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      dispatch(
        notify(
          `a new blog "${newBlog.title}" by ${newBlog.author} added`,
          "success",
          5
        )
      )
      setFormVisible(false)
    } catch (exception) {
      dispatch(notify("Failed to create new blog", "error", 5))
    }
  }

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(notify(`Liked "${blog.title}"`, "success", 5))
    } catch (exception) {
      dispatch(notify("Failed to like the blog", "error", 5))
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(notify(`Deleted "${blog.title}"`, "success", 5))
      } catch (exception) {
        dispatch(notify("Failed to delete the blog", "error", 5))
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <Input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <Input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit" variant="small">
        login
      </Button>
    </form>
  )

  const createNewBlog = () => {
    return (
      <Togglable
        buttonLabel="create new"
        visible={formVisible}
        setVisible={setFormVisible}
      >
        <CreateNewBlog handleCreateNew={handleCreateNew} />
      </Togglable>
    )
  }

  return (
    <Page>
      <Navigation>
        <NavLinks>
          <Link to="/blogs">Blogs</Link>
          <Link to="/users">Users</Link>{" "}
        </NavLinks>
        {user ? (
          <NavUserInfo>
            {user.name} logged in{" "}
            <Button onClick={handleLogout}>log out</Button>
          </NavUserInfo>
        ) : null}
      </Navigation>
      <Container>
        <Notification />
        {user === null ? (
          loginForm()
        ) : (
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    {createNewBlog()} {<BlogList />}
                  </div>
                }
              />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route
                path="/blogs/:id"
                element={
                  <Blog handleLike={handleLike} handleDelete={handleDelete} />
                }
              />
            </Routes>
          </div>
        )}
      </Container>
    </Page>
  )
}

export default App
