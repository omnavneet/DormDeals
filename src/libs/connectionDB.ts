import mongoose from "mongoose"

let isConnected = false

export async function connectionDB() {
  if (isConnected) {
    return mongoose.connection
  } else {
    isConnected = mongoose.connection.readyState === 1
    return await mongoose.connect(process.env.MONGODB_URL as string)
  }
}
