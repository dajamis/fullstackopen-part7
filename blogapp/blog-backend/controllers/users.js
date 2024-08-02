const bcrypt = require("bcrypt")
const router = require("express").Router()
const User = require("../models/user")

router.post("/", async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({ error: "password missing or too short" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

router.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  })
  response.json(users)
})

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    user: 1,
  })
  if (user) {
    res.json(user)
  }
})

module.exports = router
