import mongoose from "mongoose"

const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    pin: {
      type: Number,
      min: 1000,
      max: 9999,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)

export default User
