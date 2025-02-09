
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        const connection= mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB");


            connection.on("error", (err) => {
               console.log("Error connecting to MongoDB:", err);
               process.exit(1);
            });
        })
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;