import User from "./UserSchema.js"

// Create User
export const createUser = (obj) => {
  return User(obj).save()
}

// Get user
export const getUser = (obj) => {
  return User.findOne(obj)
}
