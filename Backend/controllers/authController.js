import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//End point for register the user
export const register = async (req,res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password )
    try{

        const userExists = await User.findOne({email});
        if(userExists) return res.status(401).json({msg:"User already Exist"});
        const user = await User.create({name,email,password});
        if(user){
            const token = jwt.sign({
                _id:user._id,
                name:user.name,
                email:user.email
            },process.env.JWT_SECRET);
            return res.status(201).json({token:token});
        } 
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}
//End point for login the user
export const login = async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({msg:"Invalid Credentials"});
    }
    const isMatch = await user.matchPassword(password);
    if(isMatch){
        const token = jwt.sign({
            _id:user._id,
            name:user.name,
            email:user.email
        },process.env.JWT_SECRET);
        return res.status(200).json({token:token});
    }
    else{
        return res.status(404).json({msg:"Invalid Credentials"});

    }
};
