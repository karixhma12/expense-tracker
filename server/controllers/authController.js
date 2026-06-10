const {signupSchema} = require("../schemas/authSchemas.js");
const {loginSchema} = require("../schemas/authSchemas.js");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async function(req,res){

    const result = signupSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message:"Incorrect format of emailID/password"});
    }    

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const user = await User.findOne({
        email : email
    })

    if(user){
        return res.json({message : "user already exists. try login?"})
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            email : email,
            password : hashedPassword,
            username : username
        })
        return res.json({message : "You have successfully signed up!"});
    }

    
}

const login = async function(req,res){
    
    const result = loginSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message:"Incorrect format of emailID/password"});
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email
    })

    if(!user){
        return res.status(400).json({message : "User does not exist"});
    }

    const isCorrectPassword = await bcrypt.compare(password,user.password);

    if(isCorrectPassword){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        return res.json({message: "You have successfully logged in!",token:`Bearer ${token}`});
    }
    else{
        return res.status(401).json({message : "Incorrect password!"});
    }
}


module.exports = {signup,login};