import express from "express"
import { createUser, getUser } from "../models/user/UserModel.js"

const userRouter = express.Router()

// Create user
userRouter.post("/", async (req, res, next) => {
  try {
    const user = await createUser(req.body)

    console.log(user)

    if (user?._id) {
      return res.json({
        status: "success",
        message: "User created successfully!",
      })
    }
    res.json({
      status: "error",
      message: "Unable to create user. Pklease try again later!",
    })
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.code = 200
      error.message =
        "There is aleray another user exist with the same email, Pelase rest passowrd to use or use different email to register"
    }
    next(error)
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
