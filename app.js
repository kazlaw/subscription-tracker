import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from "./routes/subscriptions.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express ();
//Inbuilt in Express
app.use(express.json());  //handle data sent in requests or api calls (inbuilt in express)
app.use(express.urlencoded({ extended: false })); //Enables processing data sent in HTML forms in a simple format
app.use(cookieParser()); //reads cookies from incoming data so that the app can store user data
app.use(arcjetMiddleware);
//Custom
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/workflows", workflowRouter);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send ('Welcome to the Subscription Tracker API!');
});
app.listen(PORT, async ()=> {
    console.log(`Subscription Tracker API running on http://localhost:${ PORT }`);
    await connectToDatabase();
});

export default app;