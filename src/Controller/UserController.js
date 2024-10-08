const userModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "JWTKEY";

const signup = async (req,res)=>{
    const {username,email,password} = req.body;

    try {
        
        const isUserExist = await userModel.findOne({email : email});

        if(isUserExist){
            return res.status(400).json({message : "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            username : username,
            email : email,
            password : hashedPassword
        });

        const token =  jwt.sign({email : result.email,id : result._id},SECRET_KEY);
        res.status(201).json({user : result,token : token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
};

const login = async (req,res)=>{
    const {email,password} = req.body;

    try {
        const isUserExist = await userModel.findOne({email : email});

        if(!isUserExist){
            return res.status(400).json({message : "User not found"});
        }

        const matchPassword = await bcrypt.compare(password,isUserExist.password);

        if(!matchPassword){
            return res.status(400).json({message : "Invalid Crendentials"});
        }

        const token =  jwt.sign({email : isUserExist.email,id : isUserExist._id},SECRET_KEY);
        res.status(201).json({user : isUserExist,token : token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
    
};

module.exports = {signup,login};