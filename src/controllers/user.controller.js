const { fetchUsers } = require('../services/user.service')

const getAllUsers = async (req, res) => {
  try {
    // const id = req.query.id
    const users = await fetchUsers()
    return res.send(users)
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = { getAllUsers }
