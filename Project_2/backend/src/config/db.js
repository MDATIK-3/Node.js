import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDb = async () => {
    try {
        const uri = process.env.DBString;
        if (!uri) {
            throw new Error("DBString is not defined in .env file");
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDb;
