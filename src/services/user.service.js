const User = require('../models/user.model')

const fetchUsers = async () => {
  const users = await User.find()
  return users
}

module.exports = { fetchUsers }
