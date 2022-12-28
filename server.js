import dotenv from "dotenv"
dotenv.config()
import express from "express"
import morgan from "morgan"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 8000

// MIDDLEWARES
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CONNECT MongoDB
import { mongoClient } from "./src/config/db.js"
mongoClient()

// IMPORT ROUTERS
import userRouter from "./src/routers/userRouter.js"
import transactionRouter from "./src/routers/transactionRouter.js"
import { isAuth } from "./src/middleware/authMiddleware.js"

// USE ROUTERS

app.use("/api/v1/user", userRouter)
app.use("/api/v1/transaction", isAuth, transactionRouter)

// catch when router is not found
app.use("*", (req, res, next) => {
  const error = {
    message: "404 page not found!",
    code: 404,
  }
  next(error)
})

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500
  const errorMessage = error.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  })
})

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Backend server is running at ${PORT}`)
})
