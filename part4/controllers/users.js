const User = require("../models/user");
const userRouter = require("express").Router();


userRouter.post("/", async(request, response, next)=>{
    try{
        const {username, password, name } = request.body;

        const user = new User({username, password, name });

        const savedUser = await user.save();

        response.status(201).json(savedUser);


    }catch(error){
        next(error);
    }
})