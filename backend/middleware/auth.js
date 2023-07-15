const jwt=require("jsonwebtoken")
const User=require("../models/userModel")
exports.isAuth=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({
            "messege":"please login first"
        })
    }
    //iska use sirf ye pata  krne me hai ki kon sa user login kiya hai
    const decodeddata=jwt.verify(token,"process.env.JWT_SECRET");
    req.user=await User.findById(decodeddata.id)
    next();
}
exports.isrole=(...roles)=>{
    return (req, res, next) => {
        //req.user idhar wo auth walle se aa rha
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({
            "messege":`Role:${req.user.role} is not allowed to access this resource`
          })
        }
    
        next();
      };
}
   
