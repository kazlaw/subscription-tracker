import mongoose from 'mongoose';
import {DB_URI, NODE_ENV} from "../config/env.js";

if(!DB_URI) {
    throw new Error("MongoDB URI doesn't exist or define a MONGODB environment variable inside .env.<development/production>.local");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Connected to database in ${NODE_ENV} mode`);
    }
    catch(err) {
        console.error('Error connecting to database',err);

        process.exit(1);
    }
}

export default connectToDatabase;