import User from '@models/user.model'

async function fetchUsers() {
  const users = await User.find()
  return users
}

async function registerUser(payload) {
  const newClass = new User({ ...payload })
  try {
    await newClass.save()
    return newClass
  } catch (error) {
    return error
  }
}

export default { fetchUsers, registerUser }
