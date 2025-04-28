import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) return
        await mongoose.connect(process.env.MONGODB_URI)

        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('MongoDB connection error', error)
        throw new Error('Failed to connect to MongoDB')
    }
    
}

export default connectToDB