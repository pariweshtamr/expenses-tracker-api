import express from "express"
import {
  deleteTransaction,
  getAllTransactions,
  insertTransaction,
} from "../models/transaction/TransactionModel.js"

const transactionRouter = express.Router()

// Read
transactionRouter.get("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const transactions = await getAllTransactions({ userId: authorization })
    res.json({
      status: "success",
      message: "Transactions",
      transactions,
    })
  } catch (error) {
    next(error)
  }
})

// Create
transactionRouter.post("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const response = await insertTransaction({
      ...req.body,
      userId: authorization,
    })

    response?._id
      ? res.json({
          status: "success",
          message: "Transaction added successfully!",
        })
      : res.json({
          status: "error",
          message: "Unable to add transaction. Please try again later!",
        })
  } catch (error) {
    next(error)
  }
})

// Delete
transactionRouter.delete("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const result = await deleteTransaction(req.body, authorization)

    result?.deletedCount
      ? res.json({
          status: "success",
          message: res.deletedCount + "item(s) deleted",
        })
      : res.json({
          status: "error",
          message: "Unable to delete. Please try again later!",
        })
  } catch (error) {
    next(error)
  }
})

export default transactionRouter
