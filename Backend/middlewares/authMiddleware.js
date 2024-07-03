import jwt  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Check the user is Authenticated or not
export const isAuthenticated = async (req,res,next) => {
    const token = req.header('x-auth-token');
    console.log(token)
    if(!token){
        return res.status(401).json({msg:"Token not found"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded;
        next();
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}