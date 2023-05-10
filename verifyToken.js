const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req , res , next)=>{
    // const token = req.headers.token;
    const token = process.env.ID;
    console.log("token7VF",  token );
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