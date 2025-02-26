import {Router} from 'express';
import {getAllUsers, getUser} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = new Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id',authorize ,getUser); //add the middleware before the request and you can have as many if you end the middleware with next

userRouter.post('/sign-up', (req, res) => res.send({title:`CREATE  a new user`}));

userRouter.put('/:id', (req, res) => res.send({title:`UPDATE a user's details`}));

userRouter.delete('/:id', (req, res) => res.send({title:`DELETE a user`}));


export default userRouter;