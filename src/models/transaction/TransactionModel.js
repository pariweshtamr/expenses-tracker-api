import Transaction from "./TransactionSchema"

// Insert
export const insertTransaction = (obj) => {
  return Transaction(obj).save()
}

// Read all transactions
export const getAllTransactions = (filterObj) => {
  return Transaction.find(filterObj)
}

// Delete
export const deleteTransaction = (ids, userId) => {
  return Transaction.deleteMany({
    _id: {
      $in: ids,
    },
    userId,
  })
}
