const router = require("express").Router()
const Blog = require("../models/blog")
const userExtractor = require("../utils/middleware").userExtractor

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  if (blog) {
    res.json(blog)
    console.log("Blog retrieved in response: ", res.json(blog))
  }
})

router.post("/", userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user

  if (!user) {
    return response.status(403).json({ error: "user missing" })
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url missing" })
  }

  blog.likes = blog.likes | 0
  blog.user = user
  user.blogs = user.blogs.concat(blog._id)

  await user.save()

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

router.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: "user not authorized" })
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString()
  )

  await user.save()

  response.status(204).end()
})

router.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 })

  console.log("Updated blog with populated user:", updatedBlog)

  response.json(updatedBlog)
})

router.post("/:id/comments", async (req, res) => {
  const { comment } = req.body

  if (!comment) {
    return res.status(400).json({ error: "Comment is missing" })
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" })
  }

  blog.comments = blog.comments.concat(comment)
  const updatedBlog = await blog.save()
  res.json(updatedBlog)
})

module.exports = router
