import mongoose from "mongoose"

export const mongoClient = () => {
  if (!process.env.MONGO_CLIENT)
    console.log(
      "MONGO_CLIENT is not defined. Please create MONGO_CLIENT and provide a MongoDB connection string"
    )
  try {
    mongoose.set("strictQuery", false)

    const conn = mongoose.connect(process.env.MONGO_CLIENT)

    conn
      ? console.log("Mongo DB Connected")
      : console.error("Unable to connect to Mongo DB")
  } catch (error) {
    console.log(error)
  }
}
