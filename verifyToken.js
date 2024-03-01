const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req , res , next)=>{
    const fullToken = req.headers['Authorization'];
    const token = fullToken.split("Bearer ")[1];
    // const token = process.env.ID;
    console.log("LINE AT 8 token",  token );
    if(!token){
        return next(createError(401 , "You are not authinticated"))
    };
    jwt.verify(token , process.env.JWT_SECRET , (err , user)=>{
        if(err){
            return next(createError(403 , "Token is not valid"));
        }
        req.user = user;
        console.log(user);
        next();
    })
    
}

module.exports = verifyToken;