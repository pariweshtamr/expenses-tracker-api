import express from "express"
import { createUser, getUser } from "../models/user/UserModel.js"

const userRouter = express.Router()

// Register user
userRouter.post("/", async (req, res, next) => {
  try {
    const user = await createUser(req.body)

    if (user?._id) {
      return res.json({
        status: "success",
        message: "User created successfully!",
      })
    }
    res.json({
      status: "error",
      message: "Unable to create user. Please try again later!",
    })
  } catch (error) {
    let msg = "Error, Unable to create new user"

    if (error.message.includes("E11000 duplicate key error collection")) {
      msg = "Error, an account already exists for this email address"
    }
    res.json({
      status: "error",
      message:
        "Unable to create new user because an account already exists for this email address",
    })
  }
})

// Login user
userRouter.post("/login", async (req, res, next) => {
  try {
    const user = await getUser(req.body)

    user?._id
      ? res.json({
          status: "success",
          message: "Login Successful",
          user: { name: user.name, _id: user._id },
        })
      : res.json({ status: "error", message: "Error! Invalid login details" })
  } catch (error) {
    next(error)
  }
})

export default userRouter
