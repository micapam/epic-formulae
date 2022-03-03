import mongoose from 'mongoose'

const connect = async ():Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost/epic')
    // console.log('MongoDB connected!!')
  } catch (error) {
    console.log('Failed to connect to MongoDB', error)
  }
}

const disconnect = ():Promise<void> => mongoose.connection.close()

export { connect, disconnect }
