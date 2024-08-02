import axios from "axios"
const baseUrl = "/api/users"

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    console.log("getAll response data:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    const url = `${baseUrl}/${id}`
    console.log("url: ", url)
    console.log("getUserById response data:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error fetching user by ID ${id}:`, error)
    throw error
  }
}

export default { getAll, getUserById }
