import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";
import authRouter from "../routes/auth.routes.js";

const authorize = async (req, res , next) => {

    try{
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        //Check if the user exists by the decoded id
        const user = await User.findById(decoded.userId)
        if (!user) { return res.status(401).json({message: "Unauthorized"}); }

        //if the user exists add it to the request and forward it  //To know who exactly is making the request
        req.user = user;
        next();

    }catch(error){
        res.status(401).json({ message:'Unauthorized', error: error.message });
    }
}

export default authorize;